# ChatGPT-Like Conversational AI Interface
## UI/UX Design Specification

**Document Version:** 1.0  
**Design Scope:** Web & Mobile  
**Target Users:** General users seeking conversational AI interaction  
**Design Philosophy:** Minimal, distraction-free, chat-optimized

---

## Table of Contents
1. [Executive Summary](#executive-summary)
2. [Layout Architecture](#layout-architecture)
3. [Component Specifications](#component-specifications)
4. [Interaction Patterns & Animations](#interaction-patterns--animations)
5. [Design System](#design-system)
6. [Responsive Behavior](#responsive-behavior)
7. [UX Best Practices](#ux-best-practices)
8. [Implementation Considerations](#implementation-considerations)

---

## Executive Summary

The interface prioritizes **conversational clarity**, **cognitive focus**, and **fast interactions**. Users should feel immersed in dialogue without visual noise. The design balances content density with white space, uses consistent visual language, and supports quick task completion.

**Core Principles:**
- Conversation first, chrome second
- Visual hierarchy guides attention to message content
- Minimal cognitive load through predictable patterns
- Fast feedback for all interactions
- Scalable component system

---

## Layout Architecture

### Desktop Layout (1200px+)

```
┌─────────────────────────────────────────────────────────┐
│ Header (Fixed, h=60px)                                  │
├──────────────┬──────────────────────────────────────────┤
│              │                                          │
│ Sidebar      │ Main Chat Area                          │
│ (280px)      │ (Flex, fills remaining width)           │
│ (Fixed)      │                                          │
│              │                                          │
├──────────────┼──────────────────────────────────────────┤
│              │ Input Area (Fixed bottom)                │
└──────────────┴──────────────────────────────────────────┘
```

#### Header (60px)
- **Left:** Logo/brand name (20px left padding)
- **Center:** Current chat title (if applicable)
- **Right:** User menu icon, settings, notifications (20px right padding)
- **Background:** Neutral background with subtle border-bottom
- **Position:** Sticky/fixed to top

#### Sidebar (280px, collapsible on mobile)
- **New Chat Button:** Primary CTA at top (100% width, 44px height)
- **Chat History:** Scrollable list of previous conversations
- **Dividers:** "Today", "Yesterday", "Last 7 days", "Earlier" sections
- **Background:** Slightly darker than main area for subtle contrast
- **Border-right:** Subtle 1px divider
- **Hover States:** Chat items highlight on hover with background color

#### Main Chat Area
- **Padding:** 24px horizontal, 16px top, 120px bottom (for fixed input)
- **Max-width:** 900px, centered in viewport
- **Scrollable:** Vertical overflow handling
- **Empty State:** Centered content when no chat exists
- **White-space:** 32px vertical gap between message groups

#### Input Area (Fixed bottom, 120px height including padding)
- **Background:** Slight fade from main area to input zone
- **Input Container:** 900px max-width, centered
- **Input Field:** 100% width, multi-line capable
- **Action Buttons:** Send button right-aligned, attachment/options buttons

---

## Component Specifications

### 1. Message Bubble

#### User Message
- **Alignment:** Right-aligned
- **Background:** Primary color (e.g., #1F88F0 or branded blue)
- **Text Color:** White (#FFFFFF)
- **Border-radius:** 16px (rounded on all corners except top-right)
- **Padding:** 12px 16px
- **Max-width:** 65% of chat area
- **Font:** Body text, 15px line-height 1.5
- **Shadow:** None (flat design)
- **Margin:** 8px bottom from previous message

#### Assistant Message
- **Alignment:** Left-aligned
- **Background:** Light gray (#F7F7F7)
- **Text Color:** Dark gray (#212121)
- **Border-radius:** 16px (rounded on all corners except top-left)
- **Padding:** 12px 16px
- **Max-width:** 75% of chat area
- **Font:** Body text, 15px line-height 1.5
- **Shadow:** Subtle shadow (0px 1px 3px rgba(0,0,0,0.1))
- **Margin:** 8px bottom
- **Avatar:** 32×32px circular image, positioned top-left above message
- **Typing Indicator:** Three animated dots when assistant is responding

#### Code Blocks within Messages
- **Background:** Dark gray (#1E1E1E or #2D2D2D)
- **Text:** Monospace font (Monaco, Courier New)
- **Font-size:** 13px
- **Line-height:** 1.6
- **Padding:** 16px
- **Border-radius:** 8px
- **Syntax Highlighting:** Language-specific (Python, JavaScript, SQL, etc.)
- **Copy Button:** Top-right corner, appears on hover
- **Language Label:** Top-left corner (e.g., "python", "javascript")

#### Message Actions
- **Hover Trigger:** Options bar appears on hover above message
- **Actions:**
  - Copy message text
  - Regenerate (assistant messages only)
  - Edit (user messages only)
  - Delete
  - Mark as helpful/unhelpful (thumbs up/down icons)
- **Position:** Floating toolbar, 8px above message
- **Background:** Semi-transparent dark overlay (rgba(0,0,0,0.7))
- **Icons:** 18px, white, with 12px spacing

### 2. Input Box

#### Text Input Field
- **Type:** Contenteditable div or textarea
- **Height:** Auto-expanding (min 44px, max 200px)
- **Padding:** 16px
- **Border:** 1px solid #D1D5DB (light gray)
- **Border-radius:** 12px
- **Background:** White (#FFFFFF)
- **Focus State:** Border-color: primary blue #1F88F0, subtle shadow
- **Placeholder:** "Message..." (light gray #9CA3AF)
- **Font:** 15px, line-height 1.5
- **Font-family:** System stack (Segoe UI, Roboto, etc.)
- **Resize:** Vertical only (handle at bottom-right)

#### Send Button
- **Size:** 36×36px, circular or square with rounded corners
- **Background:** Primary blue (#1F88F0) when active, disabled gray (#D1D5DB) when inactive
- **Icon:** Paper airplane or send icon (20px, white)
- **Hover:** Slight brightness increase (hover state: #1971CC)
- **Active:** Darker shade on click
- **Disabled State:** Opacity 0.5, cursor not-allowed
- **Position:** Right edge of input, with 8px margin

#### Additional Input Actions
- **Attachment Button:** 36×36px, paperclip icon
- **Microphone Button:** 36×36px, mic icon (if voice input supported)
- **Position:** Left of input field, spaced 8px apart
- **Behavior:** Click to expand options menu or trigger action
- **Hover State:** Slight background highlight (rgba(0,0,0,0.05))

### 3. Avatar

#### User Avatar
- **Size:** 32×32px (can scale to 24px or 40px based on context)
- **Border-radius:** 50% (circular)
- **Background:** User's selected color or initial (fallback)
- **Border:** None or 2px primary color (optional)
- **Initials:** First letter of name, centered, bold, white

#### Assistant Avatar
- **Size:** 32×32px
- **Border-radius:** 50%
- **Background:** Brand color or AI mascot
- **Icon:** Stylized AI symbol or bot icon (centered)
- **Consistency:** Same avatar throughout session

### 4. Typing Indicator

- **Style:** Three animated dots (pulse effect)
- **Animation:** Staggered fade-in/fade-out, 600ms cycle
- **Positioning:** Inside message bubble or standalone
- **Color:** Light gray or secondary color
- **Size:** 8px diameter dots, 4px spacing between
- **Duration:** Loop continuously until message appears

Visual sequence:
```
●  ○  ○  →  ○  ●  ○  →  ○  ○  ●  →  (repeat)
```

### 5. Sidebar Chat Item

- **Height:** 44px
- **Padding:** 12px 16px
- **Truncation:** Single line, text-overflow: ellipsis
- **Hover State:**
  - Background: rgba(0,0,0,0.05)
  - Show context menu (three dots)
- **Active State:**
  - Background: rgba(59,130,246,0.1) or primary color light variant
  - Left border: 3px primary color
- **Context Menu:**
  - Rename
  - Delete
  - Export
  - Share
- **Font-size:** 14px
- **Line-height:** 1.4
- **Colors:** Dark gray (#212121) for text, light gray (#9CA3AF) for time

### 6. Empty State

- **Content:** Centered vertically in main area
- **Message:** "Start a new conversation" or similar
- **Emoji/Icon:** Large AI or chat icon (64×64px)
- **Suggested Prompts:** 4-grid of suggested query cards
- **Card Style:**
  - Background: Light gray (#F3F4F6)
  - Border-radius: 12px
  - Padding: 16px
  - Font-size: 14px
  - Hover: Background changes to primary color light variant
  - Click: Pre-fills input with prompt text

---

## Interaction Patterns & Animations

### Click & Hover Feedback

| Element | Hover | Click | Active |
|---------|-------|-------|--------|
| Primary Button | 15% brightness ↑ | 20% brightness ↓ | Color deepens |
| Message | Options appear | - | - |
| Chat Item | Background highlight | Navigate | Background persistent |
| Icon Button | Background highlight | Scale 0.95 | Color change |
| Input Field | Border color changes | Shadow appears | Focus ring visible |

### Typing Animation

**User Message Appearance:**
- Fade-in + slide-up (200ms ease-out)
- Timing: Messages appear immediately after sending

**Assistant Message Birth:**
- Typing indicator appears first (fade-in)
- Text streams in (incremental character append, optional smooth animation)
- Alternative: Message appears fully formed (fade-in)

### Loading States

**During Message Generation:**
- Typing indicator shows progress
- Input area is disabled (buttons grayed out)
- Cursor shows thinking state
- Optional: Progress bar or percentage indicator

**Skeleton Loading (empty chat):**
- Placeholder message bubbles (light gray pulses)
- Height varies like real content
- On desktop: 2-3 skeleton messages

### Transitions

- **Page Navigation:** Fade (150ms) between chat windows
- **Sidebar Toggle:** Slide in/out (200ms ease-out)
- **Modal Dialogs:** Backdrop fade-in (100ms), dialog slide-up (200ms)
- **Message Reveal:** Fade + subtle translate (150ms)

---

## Design System

### Color Palette

| Role | Light Mode | Dark Mode | Usage |
|------|-----------|-----------|-------|
| Primary | #1F88F0 | #3B82F6 | Buttons, links, highlights |
| Secondary | #10B981 | #34D399 | Success states, confirmations |
| Danger | #EF4444 | #F87171 | Destructive actions, errors |
| Neutral 50 | #F9FAFB | #1F2937 | Backgrounds |
| Neutral 100 | #F3F4F6 | #111827 | Secondary backgrounds |
| Neutral 200 | #E5E7EB | #374151 | Borders, dividers |
| Neutral 500 | #6B7280 | #9CA3AF | Secondary text |
| Neutral 700 | #374151 | #E5E7EB | Primary text |
| Neutral 900 | #111827 | #F9FAFB | Darkest text |

#### Semantics
- **Text Color:** #212121 (light mode), #F3F4F4 (dark mode)
- **Background:** #FFFFFF (light), #0F0F0F (dark)
- **Sidebar Background:** #F7F7F7 (light), #1A1A1A (dark)
- **Message Bubble (AI):** #F7F7F7 (light), #2D2D2D (dark)
- **Message Bubble (User):** #1F88F0 (both modes)

### Typography

#### Font Family (System Stack)
```
'Segoe UI', 'Helvetica Neue', -apple-system, BlinkMacSystemFont, 
sans-serif
```

#### Font Sizes & Line Heights

| Component | Size | Weight | Line Height |
|-----------|------|--------|-------------|
| H1 (Page Title) | 28px | 600 | 1.3 |
| H2 (Section Title) | 24px | 600 | 1.3 |
| Body Text | 15px | 400 | 1.5 |
| Small Text | 13px | 400 | 1.5 |
| Labels | 12px | 500 | 1.4 |
| Code | 13px (monospace) | 400 | 1.6 |

#### Font Weights
- **Regular:** 400
- **Medium:** 500
- **Semibold:** 600
- **Bold:** 700

### Spacing Scale (8px base unit)

```
0px, 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px
```

| Usage | Size |
|-------|------|
| Tight component spacing | 4px |
| Standard padding | 16px |
| Large padding | 24px |
| Section gap | 32px |
| Large section gap | 64px |
| Margin-bottom (paragraphs) | 8px |
| Margin-bottom (messages) | 16px |

### Border Radius

| Size | Usage |
|------|-------|
| 8px | Input fields, cards, small components |
| 12px | Buttons, large cards, modals |
| 16px | Message bubbles, large elements |
| 50% | Avatars, circular elements |

### Shadow System

| Level | CSS | Usage |
|-------|-----|-------|
| None | - | Flat buttons, main content |
| Subtle | 0px 1px 3px rgba(0,0,0,0.1) | Cards, message bubbles (AI) |
| Medium | 0px 4px 12px rgba(0,0,0,0.15) | Dropdowns, popovers |
| Large | 0px 12px 24px rgba(0,0,0,0.2) | Modals, elevated surfaces |

### Icons

**Icon Library:** Font Awesome, Heroicons, or Feather (20px baseline)

| Icon | Name | Usage |
|------|------|-------|
| ✉️ | Send | Submit input |
| 📎 | Attachment | Upload files |
| 🎤 | Microphone | Voice input |
| ⋯ | More | Context menu trigger |
| ✕ | Close | Dismiss dialogs |
| ⚙️ | Settings | Configuration |
| 👤 | User | Profile, account |
| 🔓 | Share | Export, share chat |
| 📋 | Copy | Duplicate content |
| 🔄 | Refresh | Regenerate response |
| ❌ | Delete | Remove item |
| ℹ️ | Info | Help, tooltips |
| 🔍 | Search | Find in sidebar |

---

## Responsive Behavior

### Desktop (1200px+)
- Sidebar visible (280px)
- Chat area: Full width minus sidebar
- Message bubbles: Max 900px centered
- All UI controls visible and accessible
- Hover states fully functional

### Tablet (768px - 1199px)
- Sidebar toggleable (hamburger menu in header)
- Chat area expands to fill when sidebar hidden
- Message bubbles: Max 85% of viewport width
- Touch-optimized button sizes (44×44px minimum)
- Input controls: Stack vertically if space constrained

### Mobile (< 768px)
- **Sidebar:** Hidden by default, slide-in drawer on hamburger click
- **Header Height:** 56px (reduced from 60px for compact view)
- **Main Area:** Full width with 12px padding
- **Message Bubbles:** 90% width (5% margin each side)
- **Input Area:** 
  - Text input: 100% width at bottom
  - Buttons: Stack horizontally below or float above
  - Min-height: 44px touch target
- **User Message:** 80% width max
- **Assistant Message:** 85% width max
- **Avatar:** 28×28px (reduced size)
- **Empty State:** Stacked prompts vertically, full width
- **Text Size:** No change (readable at 15px)

#### Mobile-Specific Interactions
- Long-press message for context menu (500ms hold)
- Swipe left to reveal delete option
- Pull-up drawer for settings/history
- Bottom sheet for options instead of floating menu

### Responsive Breakpoints
```
Mobile: 0px - 599px
Tablet: 600px - 1199px
Desktop: 1200px+
```

---

## UX Best Practices

### Conversational Interface Principles

#### 1. **Clarity Over Brevity**
- Messages should be readable and scannable
- Use clear language, avoid jargon
- Break long responses into paragraphs
- Highlight key information using formatting

#### 2. **Immediate Feedback**
- Send button should give instant visual feedback
- Show loading state immediately
- Display typing indicator within 200ms
- Acknowledge user input with message appearance

#### 3. **Progressive Disclosure**
- Show advanced options only when needed
- New users see simplified interface
- Options menu (⋯) for secondary actions
- Settings accessible but not prominent

#### 4. **Consistency & Predictability**
- Same UI patterns across all interactions
- Message structure always follows same rules
- Buttons always behave the same way
- Colors have consistent meanings

#### 5. **Performance Perception**
- Show typing indicator even if message takes time
- Stream responses to feel faster
- Load chat history lazily (pagination)
- Virtualize long message lists (only render visible)

#### 6. **Accessibility (WCAG 2.1 AA)**
- **Contrast Ratio:** 4.5:1 for text, 3:1 for graphics
- **Focus Indicators:** Visible 2px outline on all interactive elements
- **Keyboard Navigation:**
  - Tab through all controls in logical order
  - Enter to send message
  - Escape to close modals/sidebars
  - Arrow keys to navigate chat history
- **Screen Reader Support:**
  - Alt text for all images/avatars
  - ARIA labels for icon buttons
  - Semantic HTML: use `<button>`, `<nav>`, `<main>`, etc.
  - Region landmarks: `<header>`, `<aside>`, `<section>`
- **Color Independence:**
  - Don't rely on color alone to convey information
  - Use icons, text, patterns alongside color

#### 7. **Mobile Optimization**
- Minimum touch target: 44×44px
- Page load: < 3 seconds on 4G
- Lazy load images and code syntax highlighters
- Compress assets, use WebP formats
- Optimize images: 1x and 2x versions

#### 8. **Error Handling**
- **Connection Error:** Show banner with retry option
- **Message Failure:** Option to retry sending message
- **Invalid Input:** Subtle error message (red text, 12px below input)
- **Session Timeout:** Notify user, offer to reconnect
- **Toast Notifications:** 4px color sidebar, fade-out after 5 seconds

#### 9. **Context Preservation**
- Remember chat history
- Quick access to recent conversations
- Search within chat history
- Export/archive conversations
- Maintain scroll position when navigating

#### 10. **Input Assistance**
- Autocomplete suggestions for common queries
- Suggested prompts in empty state
- Character counter for input limits
- Markdown formatting hint (optional)
- Mention/command auto-trigger (e.g., @user, #tag)

### Attention & Focus

#### Message Hierarchy
1. **First reads:** User's most recent message
2. **Then reads:** AI response (full message)
3. **Details:** Secondary actions, timestamps
- Use whitespace and color contrast to guide eye
- Avoid visual distractions in chat area

#### Cognitive Load Reduction
- One main action per interface area
- Secondary actions in menus or tooltips
- Minimize decision points in primary flow
- Clear visual structure (grid, alignment, spacing)

#### Dark Mode Considerations
- High contrast for readability
- Soften blues (less eye strain)
- Same interactions in both modes
- Respect system preference

---

## Implementation Considerations

### HTML/CSS Structure Tips

#### Semantic Markup
```html
<header> <!-- Navigation, branding -->
<aside>   <!-- Sidebar, navigation drawer -->
<main>    <!-- Chat messages -->
<footer>  <!-- Input area -->
```

#### CSS Considerations
- Use CSS Grid for layout (Sidebar + Main)
- Flexbox for components (messages, buttons)
- CSS Variables for theming (colors, spacing)
- Media queries for responsive breakpoints
- will-change: transform for animations
- contain: layout; for performance

#### Performance Optimization
- Virtual scrolling for long chat histories
- Lazy loading for images/code blocks
- Debounce input for search/autocomplete
- Memoize component renders
- Use Web Workers for parsing/syntax highlighting

### Browser Support
- **Primary:** Chrome, Firefox, Safari (latest 2 versions)
- **IE11:** Graceful degradation (basic functionality)
- **Mobile:** iOS Safari 12+, Chrome Mobile, Samsung Internet

### Dark Mode Implementation
- CSS Media Query: `@media (prefers-color-scheme: dark)`
- Toggle button for manual override
- Persist user preference to localStorage
- Smooth transition when switching (100-150ms)

### Keyboard Navigation Map
```
Tab             → Cycle through focusable elements
Shift+Tab       → Reverse cycle
Enter           → Send message / Activate button
Escape          → Close modal / Reset focus
Arrow Up        → Scroll message history / Previous message
Arrow Down      → Scroll message history / Next message
Ctrl+K or Cmd+K → Open command palette (optional)
/               → Trigger commands (optional)
```

### Animation Performance
- Use `transform` and `opacity` only (GPU accelerated)
- Avoid animating `width`, `height`, `top`, `left`
- Keep animations under 300ms
- Use `prefers-reduced-motion` media query
- Test on low-end devices

---

## Summary

This design specification prioritizes **distraction-free conversation**, **clear visual hierarchy**, and **fast interactions**. Every component serves the core goal: enabling users to communicate effectively with AI.

**Key Takeaways:**
1. Sidebar + main chat layout scales from mobile to desktop
2. Message bubbles use subtle visual distinction (color, alignment, shadow)
3. Input area is fixed and always accessible
4. Animations are subtle and purposeful (< 300ms)
5. Dark/light mode both fully supported
6. Accessibility is built-in, not bolted-on
7. Responsive design is mobile-first
8. Performance optimizations support smooth interactions

**Next Phase:** Wireframes, interactive prototypes, user testing, design system documentation in Figma/Adobe XD.

---

**Design Specification Complete** ✓  
*This document serves as the blueprint for implementation by engineers and stakeholders.*
