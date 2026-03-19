# Changelog

All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](https://semver.org/) and the format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

---

## [Unreleased]

### Added
- Next.js 14 App Router frontend for Payout Operations Platform
- JWT authentication with localStorage persistence and AuthContext
- React Query hooks for payouts and recipients with auto-refresh on pending statuses
- All pages: login, dashboard, recipients, payouts history, create payout, payout detail
- Axios instance with request/response interceptors for auth and 401 redirect
- ProtectedRoute component for authenticated page guarding
- AppShell sidebar navigation
- Color-coded status Badge component
- TypeScript strict mode with shared type definitions

---

## [0.1.0] - 2026-03-19

### Added
- Initial project scaffold from frontend-starter-template
