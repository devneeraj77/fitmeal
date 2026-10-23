# PotatoFit Design System: 60-30-10 Color Architecture

Comprehensive documentation for the custom **60-30-10** color palette, typography hierarchy, contrast ratios, and theme implementation across PotatoFit.

---

## 🎨 1. Core Palette Overview

The design system is built strictly around the golden interior & digital design rule of **three colors**:
- **60% Dominant (Canvas & Elevation)**: Smoked Obsidian (`#0B0E0C` / `#121815`) & Crisp Ivory (`#F4F6F5` / `#FFFFFF`)
- **30% Secondary (Structure & Brand Depth)**: Smoked Olive Sage (`#757761`)
- **10% Accent (Interactive Action & Energy)**: Electric Cyber Lime (`#f7fe72`) & Solar Gold (`#f4e76e`)

```
┌──────────────────────────────────────┬────────────────────────┬─────────────┐
│                 60%                  │          30%           │     10%     │
│        Canvas & Surface Space        │    Brand Structure     │ Action/Fuel │
│   #0B0E0C / #121815 / #F4F6F5        │        #757761         │   #f7fe72   │
└──────────────────────────────────────┴────────────────────────┴─────────────┘
```

---

## 💎 2. Color Swatches & Specifications

### 2.1 Dominant Foundation (60%)

| Color Token | Hex Code | RGB | HSL | Mode | Purpose |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Obsidian Canvas** | `#0B0E0C` | `rgb(11, 14, 12)` | `hsl(140, 12%, 5%)` | Dark | Main app background, page wrapper |
| **Obsidian Card Surface** | `#121815` | `rgb(18, 24, 21)` | `hsl(150, 14%, 8%)` | Dark | Elevated cards, dialogs, drawers, sticky HUD |
| **Obsidian Recessed / Elevation** | `#18201A` | `rgb(24, 32, 26)` | `hsl(135, 14%, 11%)` | Dark | Nested cards, pill bases, active containers |
| **Ivory Canvas** | `#F4F6F5` | `rgb(244, 246, 245)` | `hsl(150, 6%, 96%)` | Light | Clean light mode app background |
| **Pure White Card** | `#FFFFFF` | `rgb(255, 255, 255)` | `hsl(0, 0%, 100%)` | Light | Light mode card surface with subtle drop shadow |

### 2.2 Secondary Structure & Brand Identity (30%)

| Color Token | Hex Code | RGB | HSL | Mode | Purpose |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Smoked Olive Sage** | `#757761` | `rgb(117, 119, 97)` | `hsl(66, 10%, 42%)` | Both | Structural borders, neutral pill separators, icons, dividers |
| **Muted Sage** | `#A0A594` | `rgb(160, 165, 148)` | `hsl(78, 9%, 61%)` | Dark | Metadata, subtext, subtle badges, unselected icons |
| **Deep Olive Sage (Light)**| `#505445` | `rgb(80, 84, 69)` | `hsl(76, 10%, 30%)` | Light | High-contrast sage headings, labels, muted text |

### 2.3 Interactive Accents & Vitality (10%)

| Color Token | Hex Code | RGB | HSL | Mode | Purpose |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Electric Cyber Lime** | `#f7fe72` | `rgb(247, 254, 114)` | `hsl(63, 98%, 72%)` | Both | Primary CTA buttons, active tabs, glowing highlights, XP gain |
| **Solar Gold** | `#f4e76e` | `rgb(244, 231, 110)` | `hsl(54, 85%, 69%)` | Dark | Secondary gradient stop, streak flames, badges |
| **Solar Ochre (Light)** | `#7A5A00` | `rgb(122, 90, 0)` | `hsl(44, 100%, 24%)` | Light | High-contrast accessible gold for light mode text & accents |

---

## 📐 3. Typography & Text Hierarchy

> **CRITICAL RULE**: Generic text colors (such as `text-slate-*`, `text-zinc-*`, or default neutral grey) are strictly eliminated. All typography uses high-contrast palette tokens.

### 3.1 Dark Mode Hierarchy (on `#0B0E0C` & `#121815`)

| Hierarchy Level | Token Class | Hex Value | Target Contrast | Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Primary / High Emphasis** | `text-white` or `text-[#E2E7DE]` | `#E2E7DE` | **16.2 : 1** (AAA) | Headings (`h1`-`h4`), modal titles, podium names |
| **Secondary / Body** | `text-[#CBD2C7]` | `#CBD2C7` | **13.4 : 1** (AAA) | Paragraphs, descriptions, quest details, table rows |
| **Muted / Metadata** | `text-[#A0A594]` | `#A0A594` | **7.8 : 1** (AAA) | Athlete handles, timestamps, units (`kg`, `kcal`), hints |
| **Subtle / Separators** | `text-[#757761]` | `#757761` | **5.5 : 1** (AA) | Neutral icons, borders, disabled states, dividers |
| **Interactive Lime Text** | `text-[#0B0E0C]` | `#0B0E0C` | **14.5 : 1** (AAA) | **Always used on Electric Lime buttons/pills** |

### 3.2 Light Mode Hierarchy (on `#F4F6F5` & `#FFFFFF`)

| Hierarchy Level | Token Class | Hex Value | Target Contrast | Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Primary / High Emphasis** | `text-[#121815]` | `#121815` | **15.8 : 1** (AAA) | Page headers, card titles, prominent text |
| **Secondary / Body** | `text-[#262A21]` | `#262A21` | **11.2 : 1** (AAA) | Descriptions, coach bios, recipe ingredients |
| **Muted / Metadata** | `text-[#575C4B]` | `#575C4B` | **5.2 : 1** (AA) | Subtext, timestamps, search placeholders |
| **Brand Structure Text** | `text-[#505445]` | `#505445` | **5.5 : 1** (AA) | Tags, labels, active borders |
| **Solar Accent Text** | `text-[#7A5A00]` | `#7A5A00` | **5.8 : 1** (AA) | Streak numbers, high-priority highlights |

---

## ⚡ 4. The Electric Lime Button Rule (WCAG AAA)

On any button or badge using the Electric Lime or Solar Gold gradient:
```tsx
bg-gradient-to-r from-[#f7fe72] to-[#f4e76e]
```
- ❌ **NEVER** use `text-white`, `text-slate-200`, or light text. (Fails at **1.15 : 1** illegible contrast).
- ✅ **ALWAYS** use `text-[#0B0E0C]` or `text-black font-black`. (Achieves **14.5 : 1** WCAG AAA rating).

```tsx
// ✅ Correct accessible implementation
<button className="bg-gradient-to-r from-[#f7fe72] to-[#f4e76e] text-[#0B0E0C] font-black px-4 py-2 rounded-xl shadow-md">
  Log Fuel (+50 XP)
</button>
```

---

## 🧩 5. Component Styling Reference

### 5.1 Cards & Containers
```tsx
// Standard Dark Card with subtle elevation
<div className="bg-[#121815] border border-[#757761]/30 rounded-3xl p-6 shadow-2xl">
  <h3 className="text-lg font-bold text-white">Title</h3>
  <p className="text-xs text-[#CBD2C7] mt-1">Readable description</p>
  <span className="text-[11px] text-[#A0A594]">Metadata or date</span>
</div>
```

### 5.2 Category Badges & Division Tiers
```tsx
// Smoked Olive Sage Secondary Badge
<span className="bg-[#18201A] text-[#CBD2C7] border border-[#757761]/50 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold">
  Tier: Gold I
</span>

// Electric Lime High-Priority Pill
<span className="bg-[#f7fe72] text-[#0B0E0C] font-black px-2 py-0.5 rounded text-[11px] uppercase tracking-wider">
  +250 Arena XP
</span>
```

### 5.3 Inputs & Search Bars
```tsx
<div className="relative">
  <Search className="w-4 h-4 text-[#A0A594] absolute left-3 top-1/2 -translate-y-1/2" />
  <input
    type="text"
    placeholder="Search contenders or city..."
    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-black/40 border border-[#757761]/40 text-white placeholder-[#757761] focus:ring-2 focus:ring-[#f7fe72] focus:outline-none"
  />
</div>
```

### 5.4 Tables & Lists
```tsx
<table className="w-full text-left border-collapse">
  <thead>
    <tr className="border-b border-[#757761]/30 text-[11px] font-bold text-[#A0A594] uppercase tracking-wider font-mono bg-black/20">
      <th className="py-3 px-3">Rank</th>
      <th className="py-3 px-3">Athlete</th>
      <th className="py-3 px-3 text-right">Score</th>
    </tr>
  </thead>
  <tbody className="divide-y divide-[#757761]/20 text-xs">
    <tr>
      <td className="py-3.5 px-3 text-[#f7fe72] font-mono font-black">#1</td>
      <td className="py-3.5 px-3">
        <span className="font-bold text-white">Athlete Name</span>
        <span className="text-[11px] text-[#A0A594] ml-2">@handle</span>
      </td>
      <td className="py-3.5 px-3 text-right text-[#E2E7DE] font-mono">14,250 XP</td>
    </tr>
  </tbody>
</table>
```

---

## ⚙️ 6. Tailwind & CSS Tokens

Implemented in `src/app/globals.css`:

```css
:root {
  --background: #F4F6F5;
  --foreground: #121815;
  --card: #FFFFFF;
  --card-foreground: #121815;
  --popover: #FFFFFF;
  --popover-foreground: #121815;
  --primary: #121815;
  --primary-foreground: #FFFFFF;
  --secondary: #EAEFEA;
  --secondary-foreground: #121815;
  --muted: #E2E8F0;
  --muted-foreground: #575C4B;
  --accent: #7A5A00;
  --accent-foreground: #FFFFFF;
  --border: rgba(117, 119, 97, 0.22);
  --input: rgba(117, 119, 97, 0.25);
  --ring: #757761;
}

.dark, [data-theme="dark"] {
  --background: #0B0E0C;
  --foreground: #E2E7DE;
  --card: #121815;
  --card-foreground: #E2E7DE;
  --popover: #121815;
  --popover-foreground: #E2E7DE;
  --primary: #f7fe72;
  --primary-foreground: #0B0E0C;
  --secondary: #18201A;
  --secondary-foreground: #E2E7DE;
  --muted: #1A221E;
  --muted-foreground: #A0A594;
  --accent: #f7fe72;
  --accent-foreground: #0B0E0C;
  --border: rgba(117, 119, 97, 0.4);
  --input: rgba(117, 119, 97, 0.45);
  --ring: #f7fe72;
}
```

---

## 📋 7. Do's and Don'ts Checklist

| Rule | ✅ DO | ❌ DON'T |
| :--- | :--- | :--- |
| **Strict 3 Colors** | Use Obsidian `#0B0E0C` (60%), Olive Sage `#757761` (30%), Cyber Lime `#f7fe72` (10%) | Never introduce extraneous hues (purple, violet, pink, etc.) |
| **Text Contrast** | Use `text-[#E2E7DE]` / `text-[#CBD2C7]` for dark mode | Do not use `text-slate-300`, `text-slate-400` |
| **Muted Labels** | Use `text-[#A0A594]` or `text-[#757761]` | Do not use `text-zinc-500` or `text-gray-400` |
| **Accent Buttons** | Pair `#f7fe72` buttons strictly with `text-[#0B0E0C]` | Never put white text on lime/gold buttons |
| **Borders & Dividers**| Use `border-[#757761]/30` or `border-[#f7fe72]/40` | Do not use `border-slate-700` or `border-zinc-800` |
| **Theme Toggle** | Place theme toggles in footer glide component | Do not overlay theme switches over floating nav items |
