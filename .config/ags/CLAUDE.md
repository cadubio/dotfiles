# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an AGS (Aylur's GTK Shell) configuration written in TypeScript with JSX, creating a custom desktop bar/panel for Linux desktop environments. AGS is a framework for building desktop widgets and shells using TypeScript/JavaScript with GTK4 bindings.

## Key Commands

### Development
- `ags run` - Run the shell/bar application (uses app.ts as entry point)
- `ags run app.ts` - Explicitly run with app.ts entry file
- `ags bundle app.ts output-name` - Bundle the application for distribution
- `ags types` - Generate TypeScript types for GObject libraries
- `ags types --update` - Update TypeScript types and tsconfig
- `ags quit` - Stop running AGS instance
- `ags list` - List running AGS instances
- `ags toggle window-name` - Toggle window visibility

### Inspection and Debugging  
- `ags inspect` - Open GTK debug/inspector tool
- `ags request` - Send requests to running AGS instances

## Architecture

### Entry Point
- `app.ts` - Main application entry point that starts AGS, applies CSS, and creates bars for all monitors

### Components Structure
- `widget/System_Bar.tsx` - Main bar component with system tray, workspaces, audio controls, memory info, battery, and clock
- `system_style.scss` - SCSS styling using GTK theme colors and custom styling for bar components

### Key Dependencies
- **AGS Framework** (`ags/*`) - Core framework for GTK4 widgets and app lifecycle
- **Astal Libraries** - System integration libraries:
  - `AstalTray` - System tray integration
  - `AstalWp` (WirePlumber) - Audio control
  - `AstalHyprland` - Hyprland compositor integration  
  - `AstalBattery` - Battery status
- **GTK4/GObject** - UI toolkit and object system

### Bar Components Architecture
The Bar component uses a three-section layout:
- **Left**: System tray with application indicators
- **Center**: Workspace switcher showing Hyprland workspaces
- **Right**: System information (memory, logout menu, audio controls, battery, clock)

### State Management
- Uses AGS's reactive binding system (`createBinding`) for real-time updates
- `createPoll` for periodic system information updates (RAM usage, time)
- `createState` for local component state management

### Data Flow
- System information flows through GObject bindings (battery, audio, workspaces)  
- Shell commands executed via `execAsync` and `createPoll` for system stats
- Event handling through GTK signal system and AGS event propagation

## Type System
- TypeScript with strict mode enabled
- JSX configured for AGS GTK4 components (`jsxImportSource: "ags/gtk4"`)
- GObject introspection types in `@girs/` directory provide type definitions
- Custom module declarations in `env.d.ts` for SCSS/CSS imports

## Styling
- SCSS with GTK theme integration using `@theme_fg_color` and `@theme_bg_color`
- Component-specific styling in `style.scss`
- CSS properties applied directly in JSX using `css` prop for inline styles
