# Website Conversion Points - Wireframe Specifications

## Rachel Lee Patient Advocacy

### 1. Consultation Booking Flow

```
┌── Consultation Booking Page ─────────────────┐
│                                             │
│  [Progress: 1 of 3]                         │
│                                             │
│  ┌── Service Selection ──────────────────┐  │
│  │ ⭘ Initial Consultation               │  │
│  │ ⭘ Insurance Navigation               │  │
│  │ ⭘ Medical Documentation Review       │  │
│  │ ⭘ Provider Communication            │  │
│  └─────────────────────────────────────-┘  │
│                                             │
│  ┌── Preferred Contact Time ─────────────┐  │
│  │ Date Picker [Select Date]            │  │
│  │ Time Slots  [Available Times]        │  │
│  └─────────────────────────────────────-┘  │
│                                             │
│  [Next Step →]                              │
└─────────────────────────────────────────────┘

┌── Contact Information ──────────────────────┐
│                                             │
│  [Progress: 2 of 3]                         │
│                                             │
│  ┌── Your Information ─────────────────┐    │
│  │ Name:     [____________]            │    │
│  │ Email:    [____________]            │    │
│  │ Phone:    [____________]            │    │
│  │                                     │    │
│  │ Brief description of needs:         │    │
│  │ [                    ]              │    │
│  │ [                    ]              │    │
│  └─────────────────────────────────────┘    │
│                                             │
│  [← Back]            [Next Step →]          │
└─────────────────────────────────────────────┘

┌── Confirmation Page ───────────────────────┐
│                                            │
│  [Progress: 3 of 3]                        │
│                                            │
│  ✓ Consultation Scheduled!                 │
│                                            │
│  Summary:                                  │
│  Service: [Selected Service]               │
│  Date: [Selected Date]                     │
│  Time: [Selected Time]                     │
│                                            │
│  Next Steps:                               │
│  1. Check email for confirmation           │
│  2. Complete intake form                   │
│  3. Review preparation guidelines          │
│                                            │
│  [Download Calendar Invite]                │
│  [Access Intake Form]                      │
└────────────────────────────────────────────┘
```

### 2. Resource Library Access

```
┌── Resource Library ────────────────────────┐
│                                           │
│  ┌── Resource Categories ───────────────┐  │
│  │ ◉ Healthcare Navigation             │  │
│  │ ◉ Insurance Guides                  │  │
│  │ ◉ Medical Documentation            │  │
│  │ ◉ Self-Advocacy Tools              │  │
│  └───────────────────────────────────--┘  │
│                                           │
│  ┌── Featured Resources ───────────────┐  │
│  │ [Resource 1 Card]  [Resource 2 Card]│  │
│  │ [Resource 3 Card]  [Resource 4 Card]│  │
│  └───────────────────────────────────--┘  │
│                                           │
│  [Search Resources...]                    │
│                                           │
└───────────────────────────────────────────┘

┌── Resource Download ───────────────────────┐
│                                           │
│  [Resource Title]                         │
│  [Resource Preview Image]                 │
│                                           │
│  Description:                             │
│  [Resource description text...]           │
│                                           │
│  To access this resource:                 │
│  ┌── Quick Access ──────────────────────┐ │
│  │ Email: [___________________]         │ │
│  │ [✓] Subscribe to newsletter         │ │
│  │                                      │ │
│  │ [Download Now]                       │ │
│  └──────────────────────────────────────┘ │
└───────────────────────────────────────────┘
```

## UMI Lee

### 1. Movement Assessment Flow

```
┌── Movement Assessment Quiz ────────────────┐
│                                           │
│  [Progress Bar: 1 of 4]                   │
│                                           │
│  Question 1:                              │
│  Current Movement Experience              │
│                                           │
│  ┌── Selection ────────────────────────┐  │
│  │ ⭘ New to movement practice         │  │
│  │ ⭘ Some experience                  │  │
│  │ ⭘ Regular practice                 │  │
│  │ ⭘ Advanced practitioner           │  │
│  └────────────────────────────────────┘  │
│                                           │
│  [Next Question →]                        │
└───────────────────────────────────────────┘

┌── Assessment Results ──────────────────────┐
│                                           │
│  Your Movement Profile:                    │
│  [Visual Movement Profile Display]         │
│                                           │
│  Recommended Path:                         │
│  [Primary Recommendation]                  │
│                                           │
│  Next Steps:                              │
│  1. [Book Initial Session]                │
│  2. [Download Starter Guide]              │
│  3. [View Recommended Workshops]           │
│                                           │
│  [Schedule Assessment]                     │
└───────────────────────────────────────────┘
```

### 2. Workshop Registration

```
┌── Workshop Calendar ───────────────────────┐
│                                           │
│  [Month/Year Navigation]                  │
│                                           │
│  ┌── Workshop Grid ──────────────────┐    │
│  │ [Workshop 1] [Workshop 2]         │    │
│  │ [Workshop 3] [Workshop 4]         │    │
│  └────────────────────────────────────┘   │
│                                           │
│  Filters:                                 │
│  [Level ▼] [Type ▼] [Condition ▼]        │
│                                           │
└───────────────────────────────────────────┘

┌── Workshop Details ───────────────────────┐
│                                          │
│  [Workshop Title]                        │
│  [Workshop Preview Video]                │
│                                          │
│  Details:                                │
│  - Date: [Date]                         │
│  - Time: [Time]                         │
│  - Level: [Level]                       │
│  - Prerequisites: [List]                │
│                                          │
│  [Register Now]                          │
│                                          │
└──────────────────────────────────────────┘

┌── Registration Form ──────────────────────┐
│                                          │
│  Personal Information:                   │
│  Name:  [____________]                   │
│  Email: [____________]                   │
│  Phone: [____________]                   │
│                                          │
│  Movement Experience:                    │
│  [Previous experience text area]         │
│                                          │
│  Health Considerations:                  │
│  [Health information text area]          │
│                                          │
│  [Complete Registration]                 │
└──────────────────────────────────────────┘
```

## Mobile Responsive Considerations

### Key Elements for Mobile
- Single column layouts
- Collapsible sections
- Touch-friendly input fields
- Simplified navigation
- Larger tap targets
- Full-width buttons
- Progressive disclosure of information

### Mobile-Specific Features
- Click-to-call buttons
- Mobile-optimized forms
- Swipe gestures for calendars
- Bottom sheet modals
- Floating action buttons
- Pull-to-refresh

## Accessibility Features

### Universal Elements
- High contrast text
- Clear focus states
- ARIA labels
- Keyboard navigation
- Screen reader compatibility
- Error state indicators
- Success confirmations

### Form Considerations
- Clear error messages
- Required field indicators
- Input validation
- Auto-fill support
- Progress saving
- Clear confirmation steps 