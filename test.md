# navbar.md

# OBJECTIVE

STRICTLY analyze the existing navbar code, CSS styles, responsive breakpoints, component structure, and current functionality before making any modifications.

Do NOT create a new navbar from scratch.

Do NOT redesign branding.

Do NOT change company colors.

Do NOT change menu structure.

Instead, identify and fix the current navbar implementation so that the final desktop navbar looks EXACTLY like the attached reference image.

The attached image is the FINAL DESIGN REFERENCE and must be treated as the source of truth for desktop layout.

---

# MANDATORY ANALYSIS PHASE

Before making any changes:

Analyze:

- Existing Navbar HTML
- Existing Navbar CSS
- Existing Responsive CSS
- Existing JavaScript
- Existing Theme Toggle Logic
- Existing Language Switch Logic
- Existing Header Layout
- Existing Navigation Structure

Generate a report:

## Current Issues Found

List:

- Duplicate Components
- Alignment Problems
- Spacing Problems
- Responsive Problems
- Accessibility Problems
- Unused Components

Only after analysis proceed with modifications.

---

# DESKTOP DESIGN REFERENCE (STRICT)

For Large Devices Only:

Screen Width:

- 1280px+
- 1366px+
- 1440px+
- 1600px+
- 1920px+

Navbar must visually match the attached screenshot.

---

# DESKTOP LAYOUT STRUCTURE

LEFT

Company Logo

KOPURAM
PROMOTER & BUILDERS LLP

---

CENTER

Navigation Menu

Home

About Us

Projects

Testimonials

Contact

---

RIGHT

Language Switcher

Theme Toggle

Book Site Visit Button

---

# DESKTOP LANGUAGE SWITCHER

IMPORTANT

Large devices ONLY.

Language switcher must use radio-style segmented control exactly like reference image.

Example:

[ EN ] [ தமிழ் ]

Requirements:

- Pill shaped container
- Active language highlighted
- Inactive language visible
- Smooth transition
- Professional appearance

Desktop Only.

---

# DESKTOP THEME TOGGLE

Large devices ONLY.

Use circular button style.

Example:

🌙

or

☀

Requirements:

- Single icon only
- Circular border
- No text label

REMOVE:

❌ Theme / Mode Text

❌ Additional Theme Labels

❌ Duplicate Theme Toggles

❌ Multiple Theme Controls

Keep only one.

---

# BOOK SITE VISIT BUTTON

Keep exactly on right side.

Requirements:

- Premium appearance
- Company primary color
- Rounded corners
- Hover animation
- Proper spacing

---

# NAVIGATION MENU

Keep:

- Home
- About Us
- Projects
- Testimonials
- Contact

Requirements:

- Equal spacing
- Center alignment
- Active menu underline
- Hover animation

Exactly like reference image.

---

# REMOVE THESE COMPLETELY

Desktop:

❌ Language Label

❌ Theme / Mode Label

❌ Duplicate Language Switchers

❌ Duplicate Theme Controls

❌ Additional Icons

❌ Extra Controls

❌ Unused Elements

❌ Debug Elements

Navbar should be minimal.

---

# RESPONSIVE BEHAVIOR

IMPORTANT

Desktop and Mobile should NOT use same UI.

---

# LARGE DEVICES

Width:

1280px+

Use:

Radio Style Language Switcher

Theme Toggle Circle

Book Site Visit Button

Exactly like attached image.

---

# TABLET DEVICES

Width:

768px - 1279px

Requirements:

Show:

Logo

Hamburger Menu

Book Site Visit Button

Hide:

Desktop Navigation

Desktop Language Radio

Desktop Theme Toggle

Move them into Drawer Menu.

---

# MOBILE DEVICES

Width:

Below 768px

Requirements:

Show:

Logo

Hamburger Button

Hide:

Desktop Menu

Desktop Language Radio

Desktop Theme Toggle

---

# MOBILE DRAWER MENU

When Hamburger Clicked

Open:

Slide Drawer

Inside Drawer Show:

Home

About Us

Projects

Testimonials

Contact

Language

Theme

Book Site Visit

---

# IMPORTANT LANGUAGE SWITCHER REQUIREMENT

Mobile and Tablet MUST NOT use radio buttons.

DO NOT use:

❌ Segmented Control

❌ Radio Buttons

❌ Toggle Group

❌ Pill Switch

Instead use simple text links.

Example:

Language

English

தமிழ்

or

Language:
EN | தமிழ்

Anchor Tags Only.

Text Based Only.

Minimal UI.

---

# IMPORTANT THEME SWITCH REQUIREMENT

Mobile and Tablet MUST NOT use desktop toggle button.

Use simple text option.

Example:

Theme

Light Mode

Dark Mode

or

Theme:
Light | Dark

Anchor Tags Only.

Text Based Only.

No radio button.

No pill switch.

No segmented control.

No button styling.

Just text links.

---

# DRAWER STRUCTURE

Home

About Us

Projects

Testimonials

Contact

----------------

Language

EN

தமிழ்

----------------

Theme

Light

Dark

----------------

Book Site Visit

---

# SPACING REQUIREMENTS

Desktop:

Navbar Height:

70px to 80px

Menu Gap:

24px to 40px

Logo Area:

Left aligned

Navigation:

Centered

Actions:

Right aligned

Perfect vertical alignment.

---

# CSS REQUIREMENTS

Remove:

- Fixed widths
- Unused styles
- Duplicate styles

Use:

Flexbox

Gap

Align-items center

Responsive media queries

Clean architecture

---

# PERFORMANCE REQUIREMENTS

Do not create separate navbar components.

Reuse existing navbar.

Refactor existing code.

Optimize:

- CSS
- JS
- DOM Structure

---

# ACCESSIBILITY

Maintain:

ARIA Labels

Keyboard Navigation

Focus States

Screen Reader Support

---

# VALIDATION CHECKLIST

Desktop:

✅ Looks exactly like attached image

✅ Radio style language switch

✅ Circular theme button

✅ Proper menu spacing

✅ Book Site Visit button aligned right

✅ No duplicate controls

---

Tablet:

✅ Hamburger menu

✅ Drawer menu

✅ Language as text links

✅ Theme as text links

---

Mobile:

✅ Hamburger menu

✅ Drawer menu

✅ Language as anchor text

✅ Theme as anchor text

✅ No radio buttons

---

# FINAL GOAL

Analyze the current navbar code and styles first.

Then refactor the existing implementation so that:

1. Desktop navbar visually matches the attached reference image exactly.
2. Desktop uses radio-style language switch and circular theme toggle.
3. Tablet and Mobile use Hamburger Menu.
4. Tablet and Mobile show Language and Theme options as simple text/anchor links only.
5. No duplicate controls exist anywhere.
6. Existing branding, logo, colors, and navigation structure remain unchanged.
7. Output must be production-ready, responsive, clean, and maintainable.