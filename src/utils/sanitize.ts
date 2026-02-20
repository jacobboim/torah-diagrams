/**
 * Collapse multiple consecutive <br> tags into a single one.
 * Handles variations like <br>, <br/>, <br />, and whitespace between them.
 */
export function sanitizeHtml(html: string): string {
  return html.replace(/(<br\s*\/?>\s*){2,}/gi, '<br>');
}
