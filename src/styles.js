'use strict';
module.exports = `
.oy-sticky-timeline{--tl-bg:#fff;--tl-panel:#f7f9fc;--tl-text:#182336;--tl-muted:#6b778b;--tl-line:#e5eaf1;--tl-accent:#2563eb;--tl-soft:#edf3ff;container-type:inline-size;box-sizing:border-box;color:var(--tl-text);background:var(--tl-bg);font:15px/1.7 system-ui,-apple-system,"PingFang SC","Microsoft YaHei",sans-serif;text-align:left;min-width:0}
.oy-sticky-timeline[data-theme=dark]{--tl-bg:#111827;--tl-panel:#1b2639;--tl-text:#e5edf9;--tl-muted:#a2b1c7;--tl-line:#314057;--tl-accent:#93b8ff;--tl-soft:#203554}
@media(prefers-color-scheme:dark){.oy-sticky-timeline[data-theme=auto]{--tl-bg:#111827;--tl-panel:#1b2639;--tl-text:#e5edf9;--tl-muted:#a2b1c7;--tl-line:#314057;--tl-accent:#93b8ff;--tl-soft:#203554}}
.oy-sticky-timeline *{box-sizing:border-box}
.oy-sticky-timeline .tl-shell{padding:32px;max-width:1280px;margin:auto;overflow-wrap:anywhere}
.oy-sticky-timeline .tl-eyebrow{font-size:11px;letter-spacing:.16em;color:var(--tl-accent);font-weight:700;margin-bottom:8px}
.oy-sticky-timeline .tl-title{font-size:30px;letter-spacing:-.04em;line-height:1.3;margin:0 0 12px}
.oy-sticky-timeline .tl-description{color:var(--tl-muted);margin:0 0 40px;max-width:640px}
.oy-sticky-timeline .tl-layout{display:grid;grid-template-columns:minmax(0,1fr) 130px;gap:40px;align-items:start}
.oy-sticky-timeline .tl-entry{display:grid;grid-template-columns:130px minmax(0,1fr);gap:24px;align-items:start;padding-bottom:56px;position:relative;scroll-margin-top:var(--tl-offset)}
.oy-sticky-timeline .tl-date{position:sticky;top:var(--tl-offset);z-index:1;align-self:start;display:inline-flex;width:fit-content;border-radius:100px;background:var(--tl-soft);color:var(--tl-accent);padding:5px 13px;font-size:13px;font-weight:650;white-space:nowrap}
.oy-sticky-timeline .tl-version{font-size:27px;line-height:1.3;letter-spacing:-.035em;margin:0 0 8px}
.oy-sticky-timeline .tl-entry-title{font-size:16px;font-weight:500;color:var(--tl-muted);margin:0 0 20px}
.oy-sticky-timeline .tl-highlights{border:1px solid var(--tl-line);background:var(--tl-panel);border-radius:14px;padding:18px 20px;margin-bottom:20px}
.oy-sticky-timeline .tl-label{font-size:12px;font-weight:650;color:var(--tl-accent);margin:0 0 12px}
.oy-sticky-timeline .tl-highlights ol{padding-left:22px;margin:0}
.oy-sticky-timeline li{padding-left:3px;margin:8px 0}
.oy-sticky-timeline .tl-section{padding:17px 0;border-bottom:1px solid var(--tl-line)}
.oy-sticky-timeline .tl-section h4{display:flex;align-items:center;gap:10px;font-size:14px;margin:0 0 12px}
.oy-sticky-timeline .tl-tag{font-size:11px;padding:2px 8px;border-radius:6px;background:var(--tl-soft);color:var(--tl-accent);font-weight:600}
.oy-sticky-timeline .tl-section ul{margin:0;padding-left:20px;color:var(--tl-muted)}
.oy-sticky-timeline .tl-nav{position:sticky;top:var(--tl-offset);display:flex;flex-direction:column;border-left:1px solid var(--tl-line);padding-left:14px;max-height:calc(100vh - var(--tl-offset) - 24px);overflow-y:auto}
.oy-sticky-timeline .tl-nav-label{font-size:11px;letter-spacing:.08em;color:var(--tl-muted);margin:0 0 10px}
.oy-sticky-timeline .tl-nav button{font:inherit;font-size:12px;color:var(--tl-muted);text-align:left;border:0;background:transparent;cursor:pointer;padding:8px 10px;border-radius:7px}
.oy-sticky-timeline .tl-nav button[aria-current=true]{background:var(--tl-soft);color:var(--tl-accent);font-weight:650}
.oy-sticky-timeline .tl-nav button:hover{color:var(--tl-accent)}
.oy-sticky-timeline .tl-nav button:focus-visible{outline:2px solid var(--tl-accent);outline-offset:2px}
.oy-sticky-timeline .tl-empty{padding:32px;border-radius:12px;background:var(--tl-panel);color:var(--tl-muted)}
.oy-sticky-timeline[data-navigation=false] .tl-layout{grid-template-columns:minmax(0,1fr)}
@container(max-width:760px){.oy-sticky-timeline .tl-layout{grid-template-columns:minmax(0,1fr);gap:0}.oy-sticky-timeline .tl-nav{display:none}.oy-sticky-timeline .tl-shell{padding:24px}.oy-sticky-timeline .tl-entry{grid-template-columns:112px minmax(0,1fr);gap:18px}}
@container(max-width:480px){.oy-sticky-timeline .tl-shell{padding:16px}.oy-sticky-timeline .tl-title{font-size:26px}.oy-sticky-timeline .tl-entry{display:block;padding-bottom:36px}.oy-sticky-timeline .tl-date{margin-bottom:16px;top:var(--tl-offset)}.oy-sticky-timeline .tl-version{font-size:23px}.oy-sticky-timeline .tl-highlights{padding:14px}}
`;
