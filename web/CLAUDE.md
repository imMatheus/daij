# CLAUDE.md

## Package Manager

- Always use `bun` — never use `npm`, `yarn`, or `pnpm`.

## React Guidelines

- Avoid `useCallback` and `useMemo` unless there is a clear, measurable performance issue. Prefer plain functions and values.

## Styling

- Use the `cn()` utility from `@/lib/utils` for conditional/merged class names instead of string interpolation.
