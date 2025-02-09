# Visual Design Strategy

## Rachel Lee Advocacy Website

### Landing Page Wireframe
```
+----------------------------------+
|          HEADER/NAV              |
+----------------------------------+
|  +----------------------------+  |
|  |     HERO SECTION          |  |
|  | +-----------------------+ |  |
|  | |   Professional Photo  | |  |
|  | |   Brand Statement    | |  |
|  | |   CTA Button         | |  |
|  | +-----------------------+ |  |
|  +----------------------------+  |
|                                 |
|  +----------------------------+ |
|  |    SERVICES PREVIEW       | |
|  | [Card] [Card] [Card]      | |
|  +----------------------------+ |
|                                 |
|  +----------------------------+ |
|  |    TESTIMONIALS           | |
|  |    <Carousel>             | |
|  +----------------------------+ |
|                                 |
|  +----------------------------+ |
|  |    BLOG PREVIEW          | |
|  | [Latest] [Featured] [News] | |
|  +----------------------------+ |
|                                 |
|  +----------------------------+ |
|  |    NEWSLETTER SIGNUP      | |
|  +----------------------------+ |
|                                 |
|  +----------------------------+ |
|  |    FACEBOOK GROUP         | |
|  |    Integration            | |
|  +----------------------------+ |
+----------------------------------+
```

### Services Page Layout
```
+----------------------------------+
|          HEADER/NAV              |
+----------------------------------+
|  +------------+ +-------------+  |
|  | ADVOCACY   | |  CONSULTING |  |
|  | Services   | |  Services   |  |
|  | Details    | |  Details    |  |
|  | Pricing    | |  Pricing    |  |
|  | Book Now   | |  Book Now   |  |
|  +------------+ +-------------+  |
|                                 |
|  +------------+ +-------------+  |
|  | SPEAKING   | |  COMMUNITY  |  |
|  | Events     | |  Classes    |  |
|  | Topics     | |  Schedule   |  |
|  | Request    | |  Register   |  |
|  +------------+ +-------------+  |
+----------------------------------+
```

## UMI Lee Website

### Landing Page Wireframe
```
+----------------------------------+
|          HEADER/NAV              |
+----------------------------------+
|  +----------------------------+  |
|  |     HERO VIDEO            |  |
|  |     Movement Demo         |  |
|  |     Quick Start CTA       |  |
|  +----------------------------+  |
|                                 |
|  +----------------------------+ |
|  |    CONDITION SELECTOR     | |
|  | [Interactive Body Map]     | |
|  +----------------------------+ |
|                                 |
|  +----------------------------+ |
|  |    SUCCESS STORIES        | |
|  |    Video Testimonials     | |
|  +----------------------------+ |
|                                 |
|  +----------------------------+ |
|  |    ASSESSMENT TOOL        | |
|  |    Interactive Quiz       | |
|  +----------------------------+ |
|                                 |
|  +----------------------------+ |
|  |    WORKSHOP PREVIEW       | |
|  |    Video + Registration   | |
|  +----------------------------+ |
+----------------------------------+
```

### Conditions Hub Layout
```
+----------------------------------+
|          HEADER/NAV              |
+----------------------------------+
|  +----------------------------+  |
|  |    INTERACTIVE BODY MAP   |  |
|  |    Click to Explore       |  |
|  +----------------------------+  |
|                                 |
|  +------------+ +-------------+ |
|  | EDS/HSD    | |  AUTISM    | |
|  | Info       | |  Resources  | |
|  | Symptoms   | |  Support    | |
|  | Management | |  Strategies | |
|  +------------+ +-------------+ |
|                                 |
|  +------------+ +-------------+ |
|  | HYPER-     | |  RELATED   | |
|  | MOBILITY   | |  CONDITIONS | |
|  | Guide      | |  Directory  | |
|  +------------+ +-------------+ |
+----------------------------------+
```

## Design System Recommendations

### Rachel Lee Advocacy

#### Color Palette
- Primary: Professional Navy (#1B365D)
- Secondary: Warm Gold (#D4AF37)
- Accent: Soft Teal (#45818E)
- Background: Clean White (#FFFFFF)
- Text: Deep Gray (#333333)

#### Typography
- Headings: Playfair Display (Professional serif)
- Body: Open Sans (Clean, readable sans-serif)
- Accents: Montserrat (Modern, bold sans-serif)

#### UI Elements
- Rounded corners on cards (8px radius)
- Subtle shadows for depth
- Clear hierarchy with whitespace
- Professional photo treatment
- Minimal animations

### UMI Lee

#### Color Palette
- Primary: Energetic Blue (#0066CC)
- Secondary: Vibrant Green (#2ECC71)
- Accent: Dynamic Purple (#9B59B6)
- Background: Light Gray (#F8F9FA)
- Text: Dark Blue (#2C3E50)

#### Typography
- Headings: Poppins (Modern, dynamic sans-serif)
- Body: Inter (Clean, accessible sans-serif)
- Accents: Roboto (Versatile sans-serif)

#### UI Elements
- Dynamic interactive elements
- Smooth animations
- Progress indicators
- Video thumbnails with play overlays
- Clear CTAs with hover effects

## Interactive Elements

### Rachel Lee Advocacy
1. Testimonials Carousel
   ```
   [<] [Quote] [Photo] [Name/Title] [>]
   ```

2. Service Cards
   ```
   +-------------------------+
   |        Icon            |
   |      Service Name      |
   |    Brief Description   |
   |         Price          |
   |     [Book Now btn]     |
   +-------------------------+
   ```

3. Blog Grid
   ```
   +-------------------------+
   |        Image           |
   |        Title           |
   |     Preview Text       |
   |    [Read More btn]     |
   +-------------------------+
   ```

### UMI Lee
1. Interactive Body Map
   ```
   +-------------------------+
   |    [Clickable Areas]   |
   |    [Hover States]      |
   |    [Condition Info]    |
   |    [Related Content]   |
   +-------------------------+
   ```

2. Progress Tracker
   ```
   +-------------------------+
   |    [Progress Bar]      |
   |    [Milestone Marks]   |
   |    [Achievement Icons] |
   |    [Stats Display]     |
   +-------------------------+
   ```

3. Video Library
   ```
   +-------------------------+
   |    [Video Grid]        |
   |    [Categories]        |
   |    [Search/Filter]     |
   |    [Playlist Builder]  |
   +-------------------------+
   ```

## Mobile Responsiveness

### Breakpoints
- Desktop: 1200px+
- Tablet: 768px - 1199px
- Mobile: < 768px

### Key Mobile Considerations
1. Collapsible navigation
2. Stack card layouts
3. Full-width video players
4. Touch-friendly interactive elements
5. Simplified animations

## Accessibility Features

### Visual
- High contrast mode toggle
- Adjustable font sizes
- Clear focus states
- Icon + text labels

### Interactive
- Keyboard navigation
- Screen reader optimization
- ARIA labels
- Alternative text
- Video transcripts

## Video Content Strategy

### Rachel Lee Advocacy
1. Professional Introduction
2. Service Explanations
3. Client Testimonials
4. Speaking Engagements
5. Workshop Previews

### UMI Lee
1. Movement Demonstrations
2. Exercise Tutorials
3. Progress Case Studies
4. Condition Explanations
5. Workshop Recordings

## Next Steps
1. Create high-fidelity mockups
2. Develop interactive prototypes
3. Conduct user testing
4. Refine based on feedback
5. Prepare development specifications 