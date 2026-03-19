// Grid Layout Module — drag, resize, snap, persist
import { elements } from './elements.js';

const COLS = 20;
const ROWS = 10;

const DEFAULT_LAYOUT = {
    clock:     { col: 7,  row: 1, colSpan: 8,  rowSpan: 3 },
    search:    { col: 5,  row: 4, colSpan: 12, rowSpan: 1 },
    calendar:  { col: 1,  row: 5, colSpan: 4,  rowSpan: 3 },
    todo:      { col: 8,  row: 5, colSpan: 6,  rowSpan: 6 },
    bookmarks: { col: 14, row: 5, colSpan: 7,  rowSpan: 6 },
};

const MIN_SIZES = {
    clock:     { colSpan: 4, rowSpan: 2 },
    search:    { colSpan: 6, rowSpan: 1 },
    calendar:  { colSpan: 4, rowSpan: 3 },
    todo:      { colSpan: 4, rowSpan: 3 },
    bookmarks: { colSpan: 4, rowSpan: 3 },
};

let currentLayout = {};
let editMode = false;
let preview = null;

// ── Public API ──────────────────────────────────────────────

export function initGrid() {
    loadLayout().then(layout => {
        currentLayout = layout;
        applyLayout(currentLayout);

        if (elements.editLayoutBtn) {
            elements.editLayoutBtn.addEventListener('click', toggleEditMode);
        }
    });
}

// ── Layout Application ──────────────────────────────────────

function applyLayout(layout) {
    const widgets = document.querySelectorAll('.grid-widget');
    widgets.forEach(w => {
        const id = w.dataset.widgetId;
        const pos = layout[id];
        if (!pos) return;
        w.style.gridColumn = `${pos.col} / span ${pos.colSpan}`;
        w.style.gridRow    = `${pos.row} / span ${pos.rowSpan}`;
    });
}

// ── Edit Mode Toggle ────────────────────────────────────────

function toggleEditMode() {
    editMode = !editMode;
    document.body.classList.toggle('grid-edit-mode', editMode);
    elements.editLayoutBtn.classList.toggle('active', editMode);

    const widgets = document.querySelectorAll('.grid-widget');
    if (editMode) {
        widgets.forEach(w => {
            ensureResizeHandle(w);
            setupDrag(w);
            setupResize(w);
        });
    } else {
        widgets.forEach(w => {
            // Clean up listeners by replacing node (simple approach)
            w.onpointerdown = null;
            const handle = w.querySelector('.resize-handle');
            if (handle) handle.onpointerdown = null;
        });
        removePreview();
    }
}

function ensureResizeHandle(widget) {
    if (widget.querySelector('.resize-handle')) return;
    const handle = document.createElement('div');
    handle.className = 'resize-handle';
    widget.appendChild(handle);
}

// ── Coordinate Helpers ──────────────────────────────────────

function getContainerRect() {
    return document.querySelector('.container').getBoundingClientRect();
}

function getCellFromPoint(x, y) {
    const rect = getContainerRect();
    const cellW = rect.width / COLS;
    const cellH = rect.height / ROWS;
    const col = Math.floor((x - rect.left) / cellW) + 1;
    const row = Math.floor((y - rect.top) / cellH) + 1;
    return {
        col: Math.max(1, Math.min(col, COLS)),
        row: Math.max(1, Math.min(row, ROWS)),
    };
}

function getCellPixelRect(col, row, colSpan, rowSpan) {
    const rect = getContainerRect();
    const cellW = rect.width / COLS;
    const cellH = rect.height / ROWS;
    return {
        left:   rect.left + (col - 1) * cellW,
        top:    rect.top  + (row - 1) * cellH,
        width:  colSpan * cellW,
        height: rowSpan * cellH,
    };
}

// ── Collision Detection ─────────────────────────────────────

function checkCollision(widgetId, col, row, colSpan, rowSpan) {
    // Bounds check
    if (col < 1 || row < 1 || col + colSpan - 1 > COLS || row + rowSpan - 1 > ROWS) {
        return true;
    }
    for (const [id, pos] of Object.entries(currentLayout)) {
        if (id === widgetId) continue;
        // Check if the widget is visible (not hidden)
        const el = document.querySelector(`[data-widget-id="${id}"]`);
        if (el && el.style.display === 'none') continue;

        const overlapH = col < pos.col + pos.colSpan && col + colSpan > pos.col;
        const overlapV = row < pos.row + pos.rowSpan && row + rowSpan > pos.row;
        if (overlapH && overlapV) return true;
    }
    return false;
}

// ── Preview Element ─────────────────────────────────────────

function showPreview(col, row, colSpan, rowSpan, valid) {
    if (!preview) {
        preview = document.createElement('div');
        preview.className = 'grid-placement-preview';
        document.querySelector('.container').appendChild(preview);
    }
    const pr = getCellPixelRect(col, row, colSpan, rowSpan);
    const cr = getContainerRect();
    preview.style.left   = (pr.left - cr.left) + 'px';
    preview.style.top    = (pr.top  - cr.top)  + 'px';
    preview.style.width  = pr.width  + 'px';
    preview.style.height = pr.height + 'px';
    preview.classList.toggle('invalid', !valid);
}

function removePreview() {
    if (preview) {
        preview.remove();
        preview = null;
    }
}

// ── Drag-and-Drop ───────────────────────────────────────────

function setupDrag(widget) {
    widget.onpointerdown = (e) => {
        // Ignore if clicking on resize handle or interactive elements
        if (e.target.closest('.resize-handle')) return;
        if (e.target.closest('input, button, select, textarea, a')) return;
        if (!editMode) return;

        e.preventDefault();
        const id = widget.dataset.widgetId;
        const pos = { ...currentLayout[id] };
        const startCell = getCellFromPoint(e.clientX, e.clientY);
        const offsetCol = startCell.col - pos.col;
        const offsetRow = startCell.row - pos.row;

        // Create ghost
        const ghost = widget.cloneNode(true);
        ghost.className = 'grid-drag-ghost';
        const wr = widget.getBoundingClientRect();
        ghost.style.width  = wr.width  + 'px';
        ghost.style.height = wr.height + 'px';
        ghost.style.left   = wr.left   + 'px';
        ghost.style.top    = wr.top    + 'px';
        document.body.appendChild(ghost);

        widget.style.opacity = '0.3';

        let lastCol = pos.col;
        let lastRow = pos.row;
        let valid   = true;

        const onMove = (ev) => {
            ghost.style.left = (ev.clientX - wr.width / 2)  + 'px';
            ghost.style.top  = (ev.clientY - wr.height / 2) + 'px';

            const cell = getCellFromPoint(ev.clientX, ev.clientY);
            let newCol = cell.col - offsetCol;
            let newRow = cell.row - offsetRow;
            // Clamp
            newCol = Math.max(1, Math.min(newCol, COLS - pos.colSpan + 1));
            newRow = Math.max(1, Math.min(newRow, ROWS - pos.rowSpan + 1));

            lastCol = newCol;
            lastRow = newRow;
            valid = !checkCollision(id, newCol, newRow, pos.colSpan, pos.rowSpan);
            showPreview(newCol, newRow, pos.colSpan, pos.rowSpan, valid);
        };

        const onUp = () => {
            document.removeEventListener('pointermove', onMove);
            document.removeEventListener('pointerup', onUp);
            ghost.remove();
            removePreview();
            widget.style.opacity = '';

            if (valid) {
                currentLayout[id] = { ...pos, col: lastCol, row: lastRow };
                applyLayout(currentLayout);
                saveLayout(currentLayout);
            }
        };

        document.addEventListener('pointermove', onMove);
        document.addEventListener('pointerup', onUp);
    };
}

// ── Resize ──────────────────────────────────────────────────

function setupResize(widget) {
    const handle = widget.querySelector('.resize-handle');
    if (!handle) return;

    handle.onpointerdown = (e) => {
        if (!editMode) return;
        e.preventDefault();
        e.stopPropagation();

        const id = widget.dataset.widgetId;
        const pos = { ...currentLayout[id] };
        const min = MIN_SIZES[id] || { colSpan: 2, rowSpan: 1 };
        const startX = e.clientX;
        const startY = e.clientY;
        const rect = getContainerRect();
        const cellW = rect.width / COLS;
        const cellH = rect.height / ROWS;

        let newColSpan = pos.colSpan;
        let newRowSpan = pos.rowSpan;
        let valid = true;

        const onMove = (ev) => {
            const dx = ev.clientX - startX;
            const dy = ev.clientY - startY;
            newColSpan = Math.max(min.colSpan, pos.colSpan + Math.round(dx / cellW));
            newRowSpan = Math.max(min.rowSpan, pos.rowSpan + Math.round(dy / cellH));
            // Clamp to grid bounds
            newColSpan = Math.min(newColSpan, COLS - pos.col + 1);
            newRowSpan = Math.min(newRowSpan, ROWS - pos.row + 1);

            valid = !checkCollision(id, pos.col, pos.row, newColSpan, newRowSpan);
            showPreview(pos.col, pos.row, newColSpan, newRowSpan, valid);
        };

        const onUp = () => {
            document.removeEventListener('pointermove', onMove);
            document.removeEventListener('pointerup', onUp);
            removePreview();

            if (valid) {
                currentLayout[id] = { ...pos, colSpan: newColSpan, rowSpan: newRowSpan };
                applyLayout(currentLayout);
                saveLayout(currentLayout);
            }
        };

        document.addEventListener('pointermove', onMove);
        document.addEventListener('pointerup', onUp);
    };
}

// ── Persistence ─────────────────────────────────────────────

function saveLayout(layout) {
    const data = { gridLayout: layout };
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.sync) {
        chrome.storage.sync.set(data, () => {
            if (chrome.runtime.lastError) {
                console.warn('Grid layout save error:', chrome.runtime.lastError);
                try { localStorage.setItem('gridLayout', JSON.stringify(layout)); } catch (_) {}
            }
        });
    } else {
        try { localStorage.setItem('gridLayout', JSON.stringify(layout)); } catch (_) {}
    }
}

function loadLayout() {
    return new Promise(resolve => {
        const merge = (saved) => {
            const layout = { ...DEFAULT_LAYOUT };
            if (saved) {
                for (const key of Object.keys(DEFAULT_LAYOUT)) {
                    if (saved[key]) layout[key] = saved[key];
                }
            }
            return layout;
        };

        if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.sync) {
            chrome.storage.sync.get(['gridLayout'], (result) => {
                if (chrome.runtime.lastError) {
                    console.warn('Grid layout load error:', chrome.runtime.lastError);
                    resolve(merge(loadFromLocalStorage()));
                } else {
                    resolve(merge(result.gridLayout));
                }
            });
        } else {
            resolve(merge(loadFromLocalStorage()));
        }
    });
}

function loadFromLocalStorage() {
    try {
        const raw = localStorage.getItem('gridLayout');
        return raw ? JSON.parse(raw) : null;
    } catch (_) {
        return null;
    }
}
