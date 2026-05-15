# Integrate Corrected Output Format into CTV Package Builder

## What this task is

The CTV Package Builder currently emits a PPTX whose slide structure is now stale. A corrected reference deck (`proposal_v3.pptx`, also rendered as `proposal_v3.pdf`) and the new logo asset (`ctv_logo.png`) are bundled in this folder.

The job: update the builder's PPTX generation code so that newly generated decks match the corrected reference. **Do not redesign anything** — match the reference deck cell-for-cell, label-for-label, value-for-value.

## Reference files (in this folder)

- `proposal_v3.pptx` — the corrected output, ground truth for structure and copy
- `proposal_v3.pdf` — the same deck rendered as PDF for quick visual reference
- `ctv_logo.png` — 1268×227 PNG, must be embedded once per generated deck (one rel per slide, one media file)

---

## Pre-work: locate the mapping function

Before changing anything, find the existing PPTX generation code in the builder. Likely entry points to grep for:

- The function or method that loops over slides and writes XML / pptxgenjs calls
- A slide-template dict, a per-slide config object, or an `addSlide(...)` chain
- The Excel/JSON template that drives row labels and value placement (if the builder uses one)

Open the most recent committed version of that function and read it end-to-end before making changes. The instructions below describe **what the new output must contain**, not where in the code to put it — that mapping is yours to figure out from the existing structure.

State, before editing: the current name of the slide-generation function, the file it lives in, and which input fields feed which output cells. If you can't trace the mapping with confidence, stop and ask.

---

## Universal changes (apply to every slide)

### 1. Replace the per-slide header lockup

**Remove from every slide:**
- The small navy square at offset `(457200, 329184)`, size `201168 × 201168` EMU (this is the legacy "logo")
- The "Live Sports CTV" wordmark text box at `(713232, 292608)`, size `5486400 × 256032`
- The per-slide subtitle text box at `(713232, 502920)`, size `5486400 × 201168` (e.g. "Live In-Telecast Package · Cover", "Executive Summary", "Package Detail · Audience", "Package Detail · Custom Nets", "Package Detail · Addressable Targeting", "Package Comparison", "Methodology", "Terms & Notes")

**Replace with a single embedded picture (`<p:pic>`):**
- Image: `ctv_logo.png` (provided in this folder; embed once in `ppt/media/` and reference from each slide via its own `<Relationship>` in `slideN.xml.rels`)
- Position: `<a:off x="457200" y="274320"/>`
- Size: `<a:ext cx="2643490" cy="473202"/>` (this is 1.15× the original header block height, with the cropped logo's 1268:227 aspect ratio preserved)
- The picture must be inserted **after the two background rectangles** (the full-slide white background and the top black bar) so it renders on top of them. If you insert it before, it will be hidden.

**Note on per-slide subtitles:** they go away entirely. The new logo carries its own "Package Builder · Connected TV" tagline; the slide's body title (e.g. "Executive Summary") remains and conveys what the slide is about. Do not try to reintroduce the old subtitles elsewhere unless the builder's template explicitly requires them.

### 2. Page numbers and footers

Unchanged. The "01 / 08" style page counter at `(10515600, 329184)` stays. The two footer text boxes at `y=6446520` (left footer + right footer) stay.

### 3. Emojis in titles

Title text containing emoji clusters like `🌊🏄☀️` is **kept as colored Unicode emoji**. If the builder is currently sanitizing or stripping these, undo that. The emojis render correctly in PowerPoint and Keynote; they only render as silhouettes in LibreOffice when the host system lacks a color emoji font. This is a rendering concern, not a generation concern — emit the colored Unicode directly.

---

## Slide 1 — Cover

**Layout change:** the proposal-summary row used to have three columns (FLIGHT WINDOW / LIVE INVESTMENT / LIVE CPM) plus a fourth field below it (LIVE CONTENT). The new layout has **two columns side by side**: FLIGHT WINDOW and LIVE CONTENT.

**Remove these four text boxes entirely:**

| Old element | Old offset (x, y) | Old text |
|---|---|---|
| `LIVE INVESTMENT` label | `(4937760, 3703320)` | `LIVE INVESTMENT` |
| Investment value | `(4937760, 3950208)` | `$2,000` |
| `LIVE CPM` label | `(8778240, 3703320)` | `LIVE CPM` |
| CPM value | `(8778240, 3950208)` | `$75 CPM` |

**Remove the divider rectangle** at `(1097280, 4526280)`, size `10058400 × 9144` (the horizontal line that used to separate the FLIGHT WINDOW row from the LIVE CONTENT row).

**Move the LIVE CONTENT pair up** to the position vacated by LIVE INVESTMENT/CPM, and widen them to span both old columns:

| Element | New offset (x, y) | New size (cx, cy) | Text |
|---|---|---|---|
| `LIVE CONTENT` label | `(4937760, 3703320)` | `(6217920, 274320)` | `LIVE CONTENT` |
| Description value | `(4937760, 3950208)` | `(6217920, 411480)` | `Pro Basketball Postseason · Live in-game telecast inventory` |

FLIGHT WINDOW label and value at `(1097280, 3703320)` and `(1097280, 3950208)` stay where they are. The upper divider above this row at `(1097280, 3520440)` stays.

The cover title "Zach's Surf Shop 🌊🏄☀️" and the subtitle "Pro Basketball Postseason broadcasts in Los Angeles DMA" stay where they are.

---

## Slide 2 — Executive Summary

**Replace the body paragraph.**

Old (delete):
> Live sports packages require a 50% match: half of your investment delivers as Live in-game impressions, and an equal half delivers as a support line outside the live telecast. Total package: $4,000 — $2,000 Live and $2,000 Support. Choose one of the three support options below to complete your campaign.

New (use this exact copy):
> This proposal structures the buy as a 50/50 match between Live and Support inventory. Total package investment is $4,000, allocated as $2,000 to Live in-game inventory and $2,000 to a single Support line. The three Support options below differ in CPM and resulting impression delivery; one must be selected to complete the package.

The summary cards below this paragraph (FLIGHT, LIVE INVESTMENT $2,000 · 26,667 Imps, LIVE CPM $75 CPM, and the three support option cards: Addressable $45 / 44,444 / $2,000, Custom Nets $40 / 50,000 / $2,000, Audience $35 / 57,143 / $2,000) are unchanged.

---

## Slides 3, 4, 5 — Package Detail (Audience, Custom Nets, Addressable)

No content changes beyond the universal header swap. These slides are unchanged structurally.

---

## Slide 6 — Package Comparison (the big one)

This slide had the most extensive restructure. The old version had a 4-column data table (Live + 3 support options); the new version has a **3-column data table** (Option A / Option B / Option C) with the Live component described in prose above the table.

### Old → New table mapping

The table has 3 data columns. **The leftmost data column position is preserved as Option A**, and what used to be Option B becomes Option C in the new structure was the prior approach — but the corrected version keeps the columns in the same physical order: Option A · Addressable, Option B · Custom Nets, Option C · Audience.

**Column header row** (no changes from prior corrected version, but listed for completeness):

| Position | Header text |
|---|---|
| Col 1 | `Option A · Addressable` |
| Col 2 | `Option B · Custom Nets` |
| Col 3 | `Option C · Audience` |

**Row 1 — was "Rate" or "Live (locked)" in older drafts; now "Support Rate":**

| Cell | Old value (most recent stale draft) | New value |
|---|---|---|
| Row label | `Rate` (or `Live (locked)`) | `Support Rate` |
| Col 1 | `$75 CPM` (or `26,667 imps · $2,000`) | `$45 CPM` |
| Col 2 | `$45 CPM` | `$40 CPM` |
| Col 3 | `$40 CPM` | `$35 CPM` |

**Row 2 — was "Flight Imps"; now "Support Imps":**

| Cell | Old value | New value |
|---|---|---|
| Row label | `Flight Imps` | `Support Imps` |
| Col 1 | `26,667 Impressions` | `44,444` |
| Col 2 | `44,444 Imps` | `50,000` |
| Col 3 | `50,000 Imps` | `57,143` |

**Row 3 — "Package Total Imps" (label unchanged):**

| Cell | Old value | New value |
|---|---|---|
| Row label | `Package Total Imps` | `Package Total Imps` |
| Col 1 | `—` | `71,111` |
| Col 2 | `71,111` | `76,667` |
| Col 3 | `76,667` | `83,810` |

**Row 4 — was "Effective CPM"; now "Blended eCPM":**

| Cell | Old value | New value |
|---|---|---|
| Row label | `Effective CPM` | `Blended eCPM` |
| Col 1 | `—` | `$56.25` |
| Col 2 | `$56.25` | `$52.17` |
| Col 3 | `$52.17` | `$47.73` |

**Row 5 — was "Investment"; now "Total Investment":**

| Cell | Old value | New value |
|---|---|---|
| Row label | `Investment` | `Total Investment` |
| Col 1 | `—` | `$4,000` |
| Col 2 | `$4,000` | `$4,000` |
| Col 3 | `$4,000` | `$4,000` |

**Row 6 — DELETE ENTIRELY.** The old "Window" row contained the same flight date string (`4/18 – 6/21/2026`) repeated three times across columns. This is removed. The flight window is stated on Slide 1 and does not need to repeat on the comparison table. The associated background rectangle and the bottom row separator below this row are also removed.

The horizontal separator that previously sat **above** the Window row (at `y=5367528`) is **kept in place** — after the Window row deletion, this separator now serves as the bottom border of the Total Investment row, preserving the table's visual rhythm.

### Description paragraph above the table

Old (delete):
> Side-by-side delivery economics across the three support packages. Column 1 shows the predefined quantity of live sports impressions, while Columns 2–4 show corresponding support impressions at 50% of total campaign dollars per the corresponding support CPM. With total cost determined up front, the three options differ in total package Imps (Row 3), calculated separately for each of the three options, as well as subsequent Package eCPM/blended rate (Row 4).

New (use this exact copy):
> Each option includes the locked Live component — 26,667 in-game impressions for $2,000 at $75 CPM during Pro Basketball Postseason broadcasts — paired with $2,000 of support inventory. The three options differ in the support CPM, which drives the support impression count and the resulting blended eCPM for the full package.

### Computation reference for the mapping function

If the builder's mapping function is generating these values from inputs rather than hardcoding them, here are the formulas:

```
LIVE_INVESTMENT       = 2000           # constant, half of total
LIVE_CPM              = 75             # constant
SUPPORT_INVESTMENT    = 2000           # constant, half of total
TOTAL_INVESTMENT      = 4000           # constant

LIVE_IMPS             = LIVE_INVESTMENT / LIVE_CPM * 1000     # = 26,667 (rounded)

# Per option, where SUPPORT_CPM is the option's CPM (45 / 40 / 35):
SUPPORT_IMPS          = SUPPORT_INVESTMENT / SUPPORT_CPM * 1000
PACKAGE_TOTAL_IMPS    = LIVE_IMPS + SUPPORT_IMPS
BLENDED_eCPM          = TOTAL_INVESTMENT / PACKAGE_TOTAL_IMPS * 1000
```

Verifying the printed values with these formulas:

| Option | CPM | Support Imps | Total Imps | Blended eCPM |
|---|---|---|---|---|
| A · Addressable | $45 | 2000/45*1000 = 44,444 | 26,667 + 44,444 = 71,111 | 4000/71,111*1000 = $56.25 |
| B · Custom Nets | $40 | 2000/40*1000 = 50,000 | 26,667 + 50,000 = 76,667 | 4000/76,667*1000 = $52.17 |
| C · Audience | $35 | 2000/35*1000 = 57,143 | 26,667 + 57,143 = 83,810 | 4000/83,810*1000 = $47.73 |

Round Support Imps and Package Total Imps to the nearest whole impression. Round Blended eCPM to two decimal places. Display Support Imps and Package Total Imps with a thousands comma separator and no unit suffix (so `44,444`, not `44,444 Imps`). Display CPMs with a leading `$` and the suffix ` CPM` (so `$45 CPM`). Display Blended eCPM with a leading `$` and two decimals (so `$56.25`).

---

## Slide 7 — Methodology

### eCPM definition

Old (delete):
> Total package investment ÷ total ordered impressions × 1,000. Used to compare package efficiency net of delivered support impressions.

New (use this exact copy):
> Total package investment ÷ total package impressions × 1,000. The blended rate across Live and Support delivery, used to compare option-level efficiency.

The CPM, Live In-Telecast, Support Package, and DMA definitions are unchanged.

### Signature line

**Delete entirely.** The old slide had a `<p:pic>` element named `SignatureLine` (id=900) at `(457200, 5750000)`, size `3657600 × 224392`, embedded via `rId2`. The full `<p:pic>` block is removed; the relationship in `slide7.xml.rels` for `rId2` (which pointed to `image1.png`) is also removed since it's no longer referenced.

If the builder used to include an "Accepted and Agreed" sign-off block on this slide, that whole concept is retired. Don't conditionally hide it — remove the code path.

---

## Slide 8 — Terms & Notes

No content changes beyond the universal header swap. Unchanged structurally.

---

## After making changes

1. Generate a fresh PPTX using the same input that produced the reference deck (Zach's Surf Shop, Los Angeles DMA, Pro Basketball Postseason, 4/18 – 6/21/2026, $4,000 total).
2. Open both the freshly generated deck and `proposal_v3.pptx` side by side. They should be visually identical except for any inputs that genuinely vary by client.
3. Specifically verify:
   - The new logo appears top-left on every slide and is roughly 1.15× the original header lockup's vertical extent
   - Slide 1 has FLIGHT WINDOW and LIVE CONTENT side by side, no LIVE INVESTMENT or LIVE CPM
   - Slide 2's body paragraph reads "This proposal structures the buy as a 50/50 match…"
   - Slide 6's table has 5 rows (Support Rate, Support Imps, Package Total Imps, Blended eCPM, Total Investment), 3 data columns, and no Window row
   - Slide 7 has no signature line at the bottom
4. Run the existing test suite if there is one; add a snapshot test against `proposal_v3.pptx` if there isn't.

## What not to do

- Don't introduce new slide layouts or master slides; the existing master is fine
- Don't rename the existing rIds in slide rels files unless you also update every reference
- Don't move the page counter, the top black bar, or the footer text boxes
- Don't re-add the per-slide subtitles ("Executive Summary", "Methodology", etc.) under the new logo — the new logo's "Package Builder · Connected TV" subtitle replaces them
- Don't change the color palette, fonts, or font sizes anywhere
- Don't restructure the three support-option cards on Slide 2 — they're correct as-is
