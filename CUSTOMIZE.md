# Customization map

## 1. Main copy
Edit `content.js`.

Useful keys:
- `title`, `subtitle`, `heroDeck`
- `heroSpecs`
- `principles`
- `hardwareCards`
- `dataPanels`
- `evaluations`
- `stackRows`
- `citation`

## 2. Brand / color
Edit the variables at the top of `styles.css`:

```css
--bg: #090a0b;
--text: #f3f3ef;
--accent: #b9ff57;
--accent-2: #7de7ff;
```

## 3. Replace placeholder visuals with video
Example:

```html
<div class="data-viz reveal">
  <video autoplay muted loop playsinline style="width:100%;height:100%;object-fit:cover">
    <source src="assets/ego-view.mp4" type="video/mp4">
  </video>
</div>
```

## 4. Add logo
Replace the `.brand-dot` in `index.html` with:

```html
<img src="assets/logo.svg" alt="Brand" style="height:24px">
```

## 5. Change navigation
Edit the `<nav class="nav-links">` block in `index.html`.

## 6. Use Chinese copy
All text is UTF-8. You can directly replace English strings in `content.js` with Chinese. For Chinese typography, append a CJK webfont or use the system font stack.
