# User Flow Diagrams

## Rachel Lee Patient Advocacy

### 1. Consultation Booking Flow
```mermaid
graph TD
    A[Homepage] --> B{Service Selection}
    B -->|Initial Consultation| C[Booking Calendar]
    B -->|Insurance Navigation| C
    B -->|Documentation Review| C
    C --> D[Contact Form]
    D --> E[Confirmation]
    E --> F[Email Sequence]
    F -->|Welcome Email| G[Intake Form]
    F -->|Reminder| H[Preparation Guide]
    G --> I[First Session]
```

### 2. Resource Library Access Flow
```mermaid
graph TD
    A[Homepage] --> B[Resource Library]
    B --> C{User Status}
    C -->|New User| D[Email Capture]
    C -->|Existing User| E[Direct Access]
    D --> F[Welcome Email]
    F --> G[Resource Download]
    E --> G
    G --> H[Related Resources]
    H --> I[Newsletter Signup]
```

### 3. Community Engagement Flow
```mermaid
graph TD
    A[Homepage] --> B[Community Section]
    B --> C{Engagement Type}
    C -->|Facebook Group| D[Group Preview]
    C -->|Support Group| E[Schedule View]
    C -->|Resources| F[Library Access]
    D --> G[Join Request]
    E --> H[Registration]
    F --> I[Download]
    G --> J[Welcome Post]
    H --> K[Confirmation Email]
    I --> L[Follow-up Content]
```

## UMI Lee

### 1. Movement Assessment Flow
```mermaid
graph TD
    A[Homepage] --> B[Assessment Quiz]
    B --> C[Experience Level]
    C --> D[Movement Goals]
    D --> E[Health History]
    E --> F[Results]
    F -->|Book Session| G[Calendar]
    F -->|Download Guide| H[Resource]
    F -->|View Workshops| I[Workshop List]
    G --> J[Confirmation]
    H --> K[Email Sequence]
    I --> L[Registration]
```

### 2. Workshop Registration Flow
```mermaid
graph TD
    A[Homepage] --> B[Workshop Calendar]
    B --> C{Filter Selection}
    C -->|By Level| D[Workshop List]
    C -->|By Type| D
    C -->|By Condition| D
    D --> E[Workshop Details]
    E --> F{Registration}
    F -->|New Student| G[Create Account]
    F -->|Existing| H[Login]
    G --> I[Payment]
    H --> I
    I --> J[Confirmation]
    J --> K[Preparation Email]
```

### 3. Progress Tracking Flow
```mermaid
graph TD
    A[Client Portal] --> B[Progress Dashboard]
    B --> C{Track Type}
    C -->|Movement| D[Movement Log]
    C -->|Symptoms| E[Symptom Tracker]
    C -->|Goals| F[Goal Setting]
    D --> G[Progress Review]
    E --> G
    F --> G
    G --> H[Recommendations]
    H -->|New Goals| F
    H -->|Book Session| I[Calendar]
    H -->|Modify Program| J[Program Update]
```

## Email Sequence Flows

### 1. Welcome Sequence
```mermaid
graph TD
    A[Sign Up] --> B[Welcome Email]
    B --> C[Resource Access]
    C --> D[Day 3: Follow-up]
    D --> E[Day 7: Community]
    E --> F[Day 14: Success Story]
    F --> G[Day 21: Offer]
```

### 2. Workshop Nurture
```mermaid
graph TD
    A[Interest] --> B[Info Pack]
    B --> C[Testimonials]
    C --> D[Early Bird]
    D --> E[Last Call]
    E --> F[Post-Workshop]
    F --> G[Next Steps]
```

## Conversion Optimization Points

### Key Metrics Tracking
```mermaid
graph TD
    A[User Action] --> B{Track Point}
    B -->|Page View| C[Analytics]
    B -->|Interaction| D[Event]
    B -->|Conversion| E[Goal]
    C --> F[Report]
    D --> F
    E --> F
    F --> G[Optimization]
```

### Abandonment Recovery
```mermaid
graph TD
    A[Form Start] --> B{Completion}
    B -->|Complete| C[Success]
    B -->|Abandon| D[Exit Intent]
    D -->|Email Capture| E[Recovery Email]
    D -->|No Email| F[Retargeting]
    E --> G[Return Visit]
    F --> G
```

## Mobile User Flows

### Mobile-Specific Paths
```mermaid
graph TD
    A[Mobile Entry] --> B{Screen Size}
    B -->|Phone| C[Simplified Nav]
    B -->|Tablet| D[Hybrid View]
    C --> E[Quick Actions]
    D --> F[Full Features]
    E --> G[Click-to-Call]
    E --> H[Easy Forms]
    F --> I[Rich Content]
    F --> J[Full Calendar]
```

### Progressive Disclosure
```mermaid
graph TD
    A[Content Load] --> B{Device Type}
    B -->|Mobile| C[Essential First]
    B -->|Desktop| D[Full Content]
    C --> E[Load More]
    C --> F[Expand Sections]
    D --> G[All Visible]
    E --> H[Full Version]
    F --> H
``` 