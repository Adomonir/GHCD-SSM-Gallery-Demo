---
mode: 'agent'
description: 'Generate unit tests for UI components using project patterns and mock data'
tools: ['codebase', 'editFiles']
---

# Generate Unit Tests For UI Components

## Context
Generate unit tests for UI components in this Next.js 15 + TypeScript project.
Follow existing component patterns and keep tests focused on behavior, accessibility, and rendering correctness.

## Project-Aware Inputs
Use these files as context when relevant:
- `src/components/ui/`
- `src/components/gallery/`
- `src/components/upload/`
- `src/lib/mock-feature-card-data.ts`
- `src/lib/mock-photo-data.ts`
- `.github/prompts/generate-new-ui.prompt.md`

## Requirements
1. Detect or set up the test stack if needed:
	- Prefer `vitest` + `@testing-library/react` + `@testing-library/jest-dom`
	- If setup is missing, add minimal config and scripts
2. Create tests in colocated files using this naming convention:
	- `ComponentName.test.tsx`
3. Use strict TypeScript and avoid `any`
4. Validate component behavior, not implementation details
5. Include accessibility assertions:
	- semantic roles
	- accessible names/labels
	- keyboard interactions when applicable
6. Use project mock data for realistic test cases where useful
7. Keep tests deterministic and independent

## Test Coverage Checklist
For each component under test, cover:
- Renders with required props
- Optional props and variant states
- Empty/loading/error states if present
- Callback behavior (`onClick`, `onChange`, etc.)
- Conditional rendering branches
- Dark-mode-safe class assertions only when behavior depends on class toggles

## Priority Components
Start with these components unless the user specifies others:
- `src/components/ui/cards/FeatureCard.tsx`
- `src/components/ui/stats/StatsGrid.tsx`
- `src/components/ui/layout/SectionTitle.tsx`
- `src/components/ui/layout/RecentGalleriesTable.tsx`

## Output Format
1. Briefly list what will be created/updated
2. Add or update test files
3. Add/update test setup config only if required
4. Provide a short summary of coverage and any gaps

## Usage Examples

### Example 1: Generate tests for all priority UI components
```text
/generate-unit-tests create tests for all priority components
```

### Example 2: Target a single component
```text
/generate-unit-tests create tests for src/components/ui/layout/RecentGalleriesTable.tsx
```

### Example 3: Use mock data in tests
```text
/generate-unit-tests create FeatureCard and GalleryGrid tests using mock-feature-card-data.ts and mock-photo-data.ts
```