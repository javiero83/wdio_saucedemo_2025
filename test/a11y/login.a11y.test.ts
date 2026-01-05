import LoginPage from '../../pageobjects/login.page';
import allureReport from '@wdio/allure-reporter';
import { browser } from '@wdio/globals';
import AxeBuilder from '@axe-core/webdriverio';
import fs from 'fs';
import path from 'path';

/* =========================
   Tipos
========================= */
type A11yFinding = {
  rule: string;
  impact: string;
  description: string;
  target: string;
  failureSummary: string;
  help: string;
  helpUrl: string;
};

/* =========================
   Utilidades locales
========================= */

// Convierte violations (por regla) a findings (por instancia)
function flattenAxeViolations(violations: any[]): A11yFinding[] {
  const findings: A11yFinding[] = [];

  for (const violation of violations || []) {
    for (const node of violation.nodes || []) {
      findings.push({
        rule: violation.id,
        impact: violation.impact,
        description: violation.description,
        target: node.target?.join(', ') || 'unknown',
        failureSummary: node.failureSummary || '',
        help: violation.help || '',
        helpUrl: violation.helpUrl || ''
      });
    }
  }

  return findings;
}

// Genera HTML legible (para humanos)
function buildHumanA11yReport(findings: A11yFinding[]) {
  if (!findings.length) {
    return `
      <!DOCTYPE html>
      <html>
        <body>
          <h2>Accessibility Audit – Login</h2>
          <p>✅ No accessibility issues found.</p>
        </body>
      </html>
    `;
  }

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>A11y Audit – Login</title>
        <style>
          body { font-family: Arial, sans-serif; }
          table { border-collapse: collapse; width: 100%; }
          th { background: #333; color: #fff; }
          td, th { border: 1px solid #ccc; padding: 8px; }
          .critical { background: #ffcccc; }
          .serious { background: #ffd9cc; }
          .moderate { background: #fff4cc; }
          .minor { background: #eef7ff; }
          code { font-size: 12px; }
        </style>
      </head>
      <body>
        <h2>Accessibility Audit – Login</h2>
        <p>Total issues found: <strong>${findings.length}</strong></p>

        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Problem</th>
              <th>Rule</th>
              <th>Impact</th>
              <th>Location (CSS)</th>
              <th>Suggested Fix</th>
              <th>Reference</th>
            </tr>
          </thead>
          <tbody>
            ${findings.map((f, i) => `
              <tr class="${f.impact}">
                <td>${i + 1}</td>
                <td>${f.description}</td>
                <td><code>${f.rule}</code></td>
                <td>${f.impact}</td>
                <td><code>${f.target}</code></td>
                <td>${f.failureSummary}</td>
                <td><a href="${f.helpUrl}" target="_blank">Deque docs</a></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </body>
    </html>
  `;
}

/* =========================
   Test
========================= */

describe('Accessibility – Login Page', () => {

  it('Validate a11y in Login (axe-core)', async () => {
    allureReport.addSeverity('medium');
    allureReport.addFeature('Accessibility');
    allureReport.addStory('Login page');

    // 1) Abrir página
    await LoginPage.open();

    // 2) Screenshot general (contexto)
    const screenshot = await browser.takeScreenshot();
    allureReport.addAttachment(
      'Login Page Screenshot',
      Buffer.from(screenshot, 'base64'),
      'image/png'
    );

    // 3) Ejecutar axe
    const builder = new AxeBuilder({ client: browser }).withTags('best-practice');
    const result = await builder.analyze();

    // 4) Summary (reglas)
    const summary = {
      rules: result.violations.length,
      totalFindings: result.violations.reduce(
        (acc: number, v: any) => acc + (v.nodes?.length || 0),
        0
      ),
      critical: result.violations.filter((v: any) => v.impact === 'critical').length,
      serious: result.violations.filter((v: any) => v.impact === 'serious').length,
      moderate: result.violations.filter((v: any) => v.impact === 'moderate').length,
      minor: result.violations.filter((v: any) => v.impact === 'minor').length
    };

    allureReport.addAttachment(
      'A11y summary',
      JSON.stringify(summary, null, 2),
      'application/json'
    );

    // 5) Raw JSON (técnico)
    allureReport.addAttachment(
      'A11y violations (raw axe)',
      JSON.stringify(result.violations, null, 2),
      'application/json'
    );

    // 6) Transformar a findings humanos
    const findings = flattenAxeViolations(result.violations);

    // 7) Generar HTML
    const htmlReportString = buildHumanA11yReport(findings);

    // 8) Escribir HTML a archivo y adjuntar
    const artifactsDir = path.join(process.cwd(), 'allure-artifacts');
    if (!fs.existsSync(artifactsDir)) {
      fs.mkdirSync(artifactsDir);
    }

    const htmlPath = path.join(artifactsDir, 'login-a11y-report.html');
    fs.writeFileSync(htmlPath, htmlReportString, { encoding: 'utf-8' });

    allureReport.addAttachment(
      'A11y audit report (HTML)',
      fs.readFileSync(htmlPath),
      'text/html'
    );

    // 9) (Opcional por ahora) No fallamos el test aún
    // Cuando quieras, puedes bloquear por critical:
    // expect(summary.critical).toBe(0);
  });

});
