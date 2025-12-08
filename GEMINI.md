# GEMINI.md

**Instruction Prompt:**

You are responsible for maintaining the GEMINI.md file, which documents the architecture, data models, business logic, and development rules for this application.

Your rule: If the application has been changed in ANY way, you MUST update GEMINI.md immediately.

The application uses Node.js and pnpm for package management. Install dependencies with `pnpm install`.

Always use pnpm to manage dependencies, such as add package `pnpm add zod`

# When to Update GEMINI.md

* Update the file whenever any of the following occur:
* New features added
* Existing features modified
* Routes/API endpoints changed
* Database schema changed
* Business logic updated
* New services, functions, or utilities created
* UI structure or workflow changed
* Backend logic refactored
* New configuration settings introduced
* Deprecated functions removed
* Any behavior of the system is changed

# How to Update GEMINI.md

* Whenever an update is required:
* Identify the sections impacted
* Rewrite or append the necessary content clearly and accurately
* Keep formatting consistent
* Use concise descriptions, but ensure completeness
* Include code snippets, SQL examples, or diagrams if needed
* Maintain correct terminology (Next.js, Redis, MUNIS, collections DB, etc.)

# Your Output Requirements

* When you detect an update is needed:
* NEVER summarize
* NEVER explain the changes only
* ALWAYS directly produce the updated section(s) of GEMINI.md
* Clearly show the new or modified content so it can be merged into the file.

# Your Commitment

**You must ALWAYS keep GEMINI.md synchronized with the current application logic.**
**If any part of the application evolves, the documentation MUST evolve with it—no exceptions.**

## Project Overview

This is a **Municipal Collections Management System** - a Next.js-based debt collection and accounts receivable management platform for municipal government. The system automates the collections process for overdue bills from multiple sources (MUNIS ERP and CIS), providing collection queues, activity tracking, metrics, reporting, and risk analysis for finance and collections teams.

**Technology Stack**: 
- **Frontend**: Next.js 14+ (App Router), TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes, Server Actions
- **Database**: MS-SQL Server (MUNIS data - read-only), MS-SQL (collections activity database)
- **Cache**: Redis for high-performance data caching
- **Authentication**: NextAuth.js
- **ORM**: Prisma or node-mssql for database access
- **UI Components**: shadcn/ui, Radix UI primitives
- **Charts**: Recharts or Chart.js via react-chartjs-2

## Development Commands

### Environment Setup
```bash
# Install dependencies
pnpm install

# Setup environment variables
cp .env.example .env.local

# Generate Prisma client (if using Prisma)
pnpm prisma generate

# Initialize collections database
pnpm run db:init

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run type checking
pnpm type-check

# Run linting
pnpm lint
```

### Database Setup
```bash
# MUNIS MS-SQL connection uses Windows Authentication or SQL Server Authentication
# Collections database uses MS-SQL
# Redis for caching large datasets
# Configuration in .env.local file

# Prisma migrations (if using Prisma)
pnpm prisma migrate dev
pnpm prisma migrate deploy

# Seed database
pnpm run db:seed
```

## Architecture Overview

### Project Structure

```
/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx              # Login page
│   │   └── layout.tsx                # Auth layout
│   ├── (dashboard)/
│   │   ├── layout.tsx                # Dashboard layout with nav
│   │   ├── page.tsx                  # Main collection queue (/)
│   │   ├── dashboard/
│   │   │   └── page.tsx              # Analytics dashboard
│   │   ├── reports/
│   │   │   └── page.tsx              # Reports page
│   │   └── admin/
│   │       ├── users/
│   │       │   └── page.tsx          # User management
│   │       └── cache/
│   │           └── page.tsx          # Cache management
│   ├── api/
│   │   ├── auth/
│   │   │   └── [...nextauth]/
│   │   │       └── route.ts          # NextAuth configuration
│   │   ├── bills/
│   │   │   ├── route.ts              # GET bills with filters
│   │   │   └── [billId]/
│   │   │       ├── route.ts          # GET bill details
│   │   │       └── notes/
│   │   │           └── route.ts      # GET/POST bill notes
│   │   ├── activities/
│   │   │   └── route.ts              # POST collection activity
│   │   ├── assignments/
│   │   │   └── route.ts              # POST bill assignments
│   │   ├── customers/
│   │   │   └── [customerId]/
│   │   │       ├── contact/
│   │   │       │   └── route.ts      # GET customer contact
│   │   │       └── conditions/
│   │   │           └── route.ts      # GET special conditions
│   │   ├── reports/
│   │   │   └── [reportType]/
│   │   │       └── route.ts          # GET report data
│   │   ├── cache/
│   │   │   └── clear/
│   │   │       └── route.ts          # POST clear cache (admin)
│   │   └── export/
│   │       └── route.ts              # GET CSV export
│   ├── actions/                      # Server Actions
│   │   ├── auth.ts                   # Authentication actions
│   │   ├── bills.ts                  # Bill-related actions
│   │   ├── activities.ts             # Activity logging actions
│   │   └── assignments.ts            # Assignment actions
│   ├── layout.tsx                    # Root layout
│   └── globals.css                   # Global styles with Tailwind
├── components/
│   ├── ui/                           # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── table.tsx
│   │   ├── select.tsx
│   │   ├── input.tsx
│   │   ├── badge.tsx
│   │   ├── alert.tsx
│   │   └── ...                       # Other shadcn components
│   ├── bills/
│   │   ├── bills-table.tsx           # Main bills data table
│   │   ├── bills-filters.tsx         # Filter controls
│   │   ├── bill-notes-dialog.tsx     # Notes modal dialog
│   │   └── bill-assign-dialog.tsx    # Assignment dialog
│   ├── dashboard/
│   │   ├── kpi-cards.tsx             # KPI metric cards
│   │   ├── aging-chart.tsx           # Aging distribution chart
│   │   └── activity-feed.tsx         # Recent activities
│   ├── shared/
│   │   ├── nav.tsx                   # Main navigation
│   │   ├── user-menu.tsx             # User dropdown menu
│   │   ├── loading-spinner.tsx       # Loading states
│   │   └── error-boundary.tsx        # Error handling
│   └── providers/
│       ├── auth-provider.tsx         # Authentication context
│       └── theme-provider.tsx        # Theme management
├── lib/
│   ├── db/
│   │   ├── munis.ts                  # MUNIS database connection
│   │   ├── collections.ts            # Collections DB connection
│   │   └── queries/                  # SQL queries
│   │       ├── aging.sql
│   │       ├── bills.sql
│   │       ├── customer-address.sql
│   │       ├── customer-contact.sql
│   │       └── munis-sp-conditions.sql
│   ├── redis/
│   │   ├── client.ts                 # Redis client configuration
│   │   └── cache.ts                  # Cache utilities
│   ├── auth/
│   │   ├── config.ts                 # NextAuth configuration
│   │   └── session.ts                # Session utilities
│   ├── utils/
│   │   ├── cn.ts                     # Tailwind class merger
│   │   ├── date.ts                   # Date utilities
│   │   ├── currency.ts               # Currency formatting
│   │   └── validators.ts             # Zod schemas
│   └── constants.ts                  # Application constants
├── types/
│   ├── bill.ts                       # Bill type definitions
│   ├── activity.ts                   # Activity type definitions
│   ├── user.ts                       # User type definitions
│   └── api.ts                        # API response types
├── hooks/
│   ├── use-bills.ts                  # Bills data fetching
│   ├── use-activities.ts             # Activities data fetching
│   └── use-debounce.ts               # Debounce utility
├── middleware.ts                     # Next.js middleware for auth
├── prisma/
│   ├── schema.prisma                 # Prisma schema (if used)
│   └── seed.ts                       # Database seeding
├── public/
│   └── images/                       # Static assets
├── .env.local                        # Environment variables (not committed)
├── .env.example                      # Example env file
├── next.config.js                    # Next.js configuration
├── tailwind.config.ts                # Tailwind configuration
├── tsconfig.json                     # TypeScript configuration
├── components.json                   # shadcn/ui configuration
└── package.json                      # Dependencies
```

### Key Components

1. **Dual Database Architecture**:
   - **MUNIS Database (MS-SQL)**: Read-only connection to existing ERP system for bill/customer data
   - **Collections Database (MS-SQL)**: Separate database for collection activities, notes, tasks, and user actions
   - **Redis Cache**: High-performance caching layer for large datasets and frequently accessed data

2. **Collection Queue System**: Role-based queue views showing customers by aging status with actionable workflows

3. **Activity Tracking Engine**: Complete audit trail of all collection activities with who/when/how/what-next logging

4. **Multi-System Integration**: Interfaces with MUNIS ERP and CIS systems for comprehensive receivables data

5. **Reporting & Analytics**: Real-time metrics for productivity, cash collected, aging analysis, and forecasting

## Database Architecture

### MUNIS Database (MS-SQL - Read Only)

**Connection**: Windows Authentication or SQL Server Authentication to existing MUNIS system

**Primary View**: `dbo.unpaidbills` (from bills.sql)

**Key Fields from MUNIS**:
- `ItemIdentifier` - Unique bill ID (also unique key)
- `BillId` - Bill id (Unique key, **use this key for foreign key if join with other table**)
- `Number` - bill number
- `Category` (ARCode) - Account category
- `CustomerName` - Customer name
- `BilledAmount` - Original billed amount
- `UnpaidBalance` - Current outstanding balance
- `Year` - Bill year
- `DueDate` - bill due date
- Additional customer fields (phone, address, etc.)

### Collections Database (MS-SQL - Read/Write)

**Schema Design** (using Prisma):

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlserver"
  url      = env("COLLECTIONS_DATABASE_URL")
}

model User {
  id                    Int                    @id @default(autoincrement())
  username              String                 @unique @db.NVarChar(50)
  email                 String                 @unique @db.NVarChar(100)
  passwordHash          String                 @db.NVarChar(255)
  fullName              String?                @db.NVarChar(100)
  role                  UserRole
  isActive              Boolean                @default(true)
  createdAt             DateTime               @default(now())
  lastLogin             DateTime?
  
  assignedBills         BillAssignment[]       @relation("AssignedCollector")
  createdAssignments    BillAssignment[]       @relation("AssignmentCreator")
  activities            CollectionActivity[]
  assignedTasks         CollectionTask[]       @relation("TaskAssignee")
  completedTasks        CollectionTask[]       @relation("TaskCompleter")
  queueAssignments      QueueAssignment[]

  @@map("users")
}

enum UserRole {
  Admin
  Manager
  Collector
}

model BillAssignment {
  id              Int       @id @default(autoincrement())
  billId          String    @unique @db.NVarChar(50)
  userId          Int
  assignedAt      DateTime  @default(now())
  assignedBy      Int
  
  user            User      @relation("AssignedCollector", fields: [userId], references: [id])
  assignedByUser  User      @relation("AssignmentCreator", fields: [assignedBy], references: [id])

  @@map("bill_assignments")
}

model QueueAssignment {
  id                  Int       @id @default(autoincrement())
  customerId          String    @db.VarChar(50)
  queueName           String    @db.VarChar(50)
  collectorId         Int?
  status              String    @default("Active") @db.VarChar(50)
  followUpDate        DateTime? @db.Date
  amountDue           Decimal   @db.Decimal(15, 2)
  creditsAvailable    Decimal   @db.Decimal(15, 2)
  lastActivityDate    DateTime?
  createdAt           DateTime  @default(now())
  updatedAt           DateTime  @updatedAt
  
  collector           User?     @relation(fields: [collectorId], references: [id])

  @@map("queue_assignments")
}

model CollectionActivity {
  id                Int       @id @default(autoincrement())
  customerId        String    @db.VarChar(50)
  customerSource    String    @db.VarChar(10)
  activityType      String    @db.VarChar(50)
  activityDate      DateTime
  performedBy       Int
  contactMethod     String?   @db.VarChar(50)
  contactOutcome    String?   @db.VarChar(50)
  notes             String?   @db.Text
  amountDiscussed   Decimal?  @db.Decimal(15, 2)
  promiseAmount     Decimal?  @db.Decimal(15, 2)
  promiseDate       DateTime? @db.Date
  nextAction        String?   @db.VarChar(50)
  nextActionDate    DateTime? @db.Date
  statusChange      String?   @db.VarChar(50)
  createdAt         DateTime  @default(now())
  
  user              User      @relation(fields: [performedBy], references: [id])

  @@map("collection_activities")
}

model CollectionTask {
  id                Int       @id @default(autoincrement())
  customerId        String    @db.VarChar(50)
  customerSource    String    @db.VarChar(10)
  assignedTo        Int
  taskType          String    @db.VarChar(50)
  taskDescription   String?   @db.Text
  dueDate           DateTime  @db.Date
  priority          Priority  @default(Normal)
  status            TaskStatus @default(Pending)
  completedDate     DateTime?
  completedBy       Int?
  notes             String?   @db.Text
  createdAt         DateTime  @default(now())
  
  assignee          User      @relation("TaskAssignee", fields: [assignedTo], references: [id])
  completer         User?     @relation("TaskCompleter", fields: [completedBy], references: [id])

  @@map("collection_tasks")
}

enum Priority {
  High
  Normal
  Low
}

enum TaskStatus {
  Pending
  InProgress
  Completed
}

model QueueDefinition {
  id          Int      @id @default(autoincrement())
  queueName   String   @unique @db.VarChar(50)
  agingMin    Int?
  agingMax    Int?
  description String?  @db.Text
  sortOrder   Int?
  isActive    Boolean  @default(true)

  @@map("queue_definitions")
}

model SystemSetting {
  id            Int      @id @default(autoincrement())
  settingKey    String   @unique @db.VarChar(100)
  settingValue  String?  @db.Text
  description   String?  @db.Text
  updatedAt     DateTime @updatedAt

  @@map("system_settings")
}
```

### Redis Cache Architecture

**Cache Keys Structure**:
```typescript
// Cache key patterns
const CACHE_KEYS = {
  BILLS_LIST: (filters: string) => `bills:list:${filters}`,
  BILL_DETAIL: (billId: string) => `bill:${billId}`,
  CUSTOMER_CONTACT: (customerId: string) => `customer:contact:${customerId}`,
  SPECIAL_CONDITIONS: (billId: string) => `conditions:${billId}`,
  AGING_REPORT: (date: string) => `report:aging:${date}`,
  DASHBOARD_METRICS: (userId: number) => `dashboard:metrics:${userId}`,
  QUEUE_ASSIGNMENTS: (queueName: string) => `queue:${queueName}`,
};

// Cache TTL (Time To Live) in seconds
const CACHE_TTL = {
  BILLS_LIST: 300,        // 5 minutes
  BILL_DETAIL: 600,       // 10 minutes
  CUSTOMER_DATA: 1800,    // 30 minutes
  REPORTS: 3600,          // 1 hour
  DASHBOARD: 300,         // 5 minutes
};
```

**Cache Implementation**:
```typescript
// lib/redis/cache.ts
import { redis } from './client';

export async function getCached<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl: number = 300
): Promise<T> {
  // Try to get from cache
  const cached = await redis.get(key);
  
  if (cached) {
    return JSON.parse(cached) as T;
  }
  
  // If not in cache, fetch data
  const data = await fetcher();
  
  // Store in cache
  await redis.setex(key, ttl, JSON.stringify(data));
  
  return data;
}

export async function invalidateCache(pattern: string): Promise<void> {
  const keys = await redis.keys(pattern);
  if (keys.length > 0) {
    await redis.del(...keys);
  }
}

export async function clearAllCache(): Promise<void> {
  await redis.flushdb();
}
```

## Business Logic

### Collection Queue Management

**Aging Buckets**:
- Current (0-30 days)
- 31-60 days
- 61-90 days
- 91-120 days
- 121+ days
- 'Future Due' (not due yet)

**Bill by county**:
- Get county info from MUNIS by joining `dbo.unpaidbills` with `dbo.v_nash_edge_parcels` on the parcel ID.
- The dashboard provides a "By County" view that aggregates the total unpaid balance for each county.

**Queue Assignment Logic**:
1. Calculate days past due from MUNIS `DueDate`
2. Assign to appropriate aging bucket queue
3. Apply business rules (minimum balance thresholds, customer type filters)
4. Assign to collector based on workload balancing or territory

**Customer Queue Display**:
- Customer # (MUNIS/CIS)
- Name
- Phone
- Last Activity (auto-updated from collection_activities)
- Follow Up Date (from queue_assignments)
- Status (from queue_assignments)
- Amount Due (total unpaid balance)
- Credits (cached from MUNIS)
- Aging columns (0-30, 31-60, 61-90, 91-120, 121+)
- Total Unpaid Balance (matching filters)

### Collection Activity Tracking

**Required Information for Every Contact**:
- **Who**: User ID (performedBy)
- **When**: activityDate (timestamp)
- **How**: contactMethod (Phone, Email, Letter, In-Person, Mail)
- **What Happened**: contactOutcome, notes
- **What's Next**: nextAction, nextActionDate

**Activity Types**:
- Outbound Call
- Inbound Call
- Email Sent
- Email Received
- Letter Mailed
- Payment Received
- Payment Plan Setup
- Dispute Filed
- Legal Action Initiated
- Account Review
- Customer Meeting

### Role-Based Access Control

**Roles** (via NextAuth.js and middleware):

1. **Collector**:
   - View assigned queue only
   - Add activities and notes
   - Create tasks
   - Update customer status
   - Cannot reassign customers

2. **Manager**:
   - View all queues
   - Reassign customers between queues/collectors
   - View all reports
   - Override collection status
   - Manage team workload

3. **Admin**:
   - All manager permissions
   - User management
   - System configuration
   - Queue definitions
   - Reporting configuration
   - Cache management

### Reporting & Analytics

**Key Metrics**:
- Total Inventory (count and balance)
- Aging Distribution (by bucket)
- Collection Effectiveness (cash collected, success rate)
- Collector Productivity (contacts per day, promises obtained)
- DSO (Days Sales Outstanding)
- Right Party Contact Rate
- Promise-to-Pay Conversion Rate
- Payment Plan Adherence Rate

**Reports**:
1. Daily Activity Summary (by collector)
2. Aging Analysis (current vs prior period)
3. Cash Collected Report (by collector, period)
4. Customer Status Report
5. Forecast & Risk Analysis
6. Compliance Report (activity documentation)

## UI Requirements

### Framework & Styling

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS for utility-first styling
- **Components**: shadcn/ui (built on Radix UI primitives)
- **Icons**: Lucide React
- **Charts**: Recharts for analytics visualizations
- **Forms**: React Hook Form with Zod validation
- **Data Tables**: TanStack Table (React Table v8)

### Key Pages & Routes

1. **Login Page** (`/login`)
   - Simple, secure authentication via NextAuth.js
   - Role-based redirect after login
   - Component: `app/(auth)/login/page.tsx`

2. **Collection Queue** (`/`)
   - Server-side rendered with filters applied via URL search params
   - Client-side filtering and sorting with TanStack Table
   - Quick action buttons (View/Add Notes)
   - Bulk actions (Assign)
   - Export to CSV
   - Display total unpaid balance and record count
   - Components: `BillsTable`, `BillsFilters`, `BillNotesDialog`

3. **Notes Dialog** (Modal on Collection Queue)
   - Activity timeline (all contact history for a bill)
   - Customer contact information
   - Special conditions from MUNIS
   - Add new activity form with validation
   - Shows Bill ID and Customer ID in header
   - Component: `BillNotesDialog`

4. **Dashboard** (`/dashboard`)
   - KPI cards with real-time metrics
   - Aging distribution chart (Recharts)
   - Productivity metrics
   - Recent activities feed
   - Component: `app/(dashboard)/dashboard/page.tsx`

5. **Reports** (`/reports`)
   - Pre-defined report templates
   - Date range selection with date picker
   - Export options (PDF, Excel, CSV)
   - Component: `app/(dashboard)/reports/page.tsx`

6. **Admin Pages**:
   - User Management (`/admin/users`)
   - Cache Management (`/admin/cache`)
   - Components in `app/(dashboard)/admin/`

### API Routes

**Authentication**:
- `POST /api/auth/signin` - Login
- `POST /api/auth/signout` - Logout
- `GET /api/auth/session` - Get session

**Bills**:
- `GET /api/bills` - List bills with filters (query params)
- `GET /api/bills/[billId]` - Get bill details
- `GET /api/bills/[billId]/notes` - Get bill notes/activities
- `POST /api/bills/[billId]/notes` - Add new activity

**Customers**:
- `GET /api/customers/[customerId]/contact` - Get customer contact info
- `GET /api/customers/[customerId]/conditions` - Get special conditions

**Assignments**:
- `POST /api/assignments` - Assign bills to users

**Reports**:
- `GET /api/reports/[reportType]` - Generate report
- `GET /api/export` - Export data to CSV

**Cache** (Admin only):
- `POST /api/cache/clear` - Clear Redis cache

### Design Principles

- **Government-Appropriate**: Professional, clean, accessible
- **Data-Dense**: Maximize information density without clutter using Tailwind
- **Action-Oriented**: Quick access to common workflows with shadcn/ui dialogs
- **Mobile-Responsive**: Tailwind responsive utilities for tablets
- **WCAG 2.1 AA Compliant**: Accessible components from Radix UI
- **Dark Mode Support**: Optional theme toggle with next-themes

### shadcn/ui Components Used

```bash
# Install commonly used shadcn components
pnpm dlx shadcn-ui@latest add button
pnpm dlx shadcn-ui@latest add card
pnpm dlx shadcn-ui@latest add dialog
pnpm dlx shadcn-ui@latest add table
pnpm dlx shadcn-ui@latest add select
pnpm dlx shadcn-ui@latest add input
pnpm dlx shadcn-ui@latest add badge
pnpm dlx shadcn-ui@latest add alert
pnpm dlx shadcn-ui@latest add dropdown-menu
pnpm dlx shadcn-ui@latest add form
pnpm dlx shadcn-ui@latest add label
pnpm dlx shadcn-ui@latest add textarea
pnpm dlx shadcn-ui@latest add toast
pnpm dlx shadcn-ui@latest add calendar
pnpm dlx shadcn-ui@latest add popover
pnpm dlx shadcn-ui@latest add separator
pnpm dlx shadcn-ui@latest add tabs
pnpm dlx shadcn-ui@latest add avatar
pnpm dlx shadcn-ui@latest add skeleton
```

## Important Implementation Notes

### Data Integration

1. **MUNIS Interface**: Read-only SQL queries to `dbo.unpaidbills` and other views - NEVER write to MUNIS database
2. **CIS Interface**: Separate connection for utility billing data
3. **Data Synchronization**: Nightly batch job (cron or scheduled API route) to refresh customer balances
4. **Real-Time Updates**: Activity tracking writes immediately to collections database
5. **Redis Caching**: Cache MUNIS queries with appropriate TTL, invalidate on data changes

### Security Requirements

1. **Encrypted Connections**: All database connections use TLS/SSL
2. **Environment Variables**: All secrets in .env.local, never committed
3. **Password Hashing**: bcrypt for user passwords
4. **Audit Logging**: All user actions logged with timestamps
5. **Role-Based Access**: Enforce with NextAuth callbacks and middleware
6. **Session Management**: Secure JWT tokens with NextAuth.js
7. **CSRF Protection**: Built into Next.js API routes
8. **SQL Injection Prevention**: Use parameterized queries with Prisma or prepared statements

### Performance Requirements

1. **Queue Load Time**: < 2 seconds for up to 1,000 customers
2. **Customer Detail**: < 1 second load time
3. **Activity Save**: < 500ms response time
4. **Report Generation**: < 5 seconds for standard reports
5. **Database Indexing**: Proper indexes on customer_id, dates, status fields
6. **Redis Caching**: Aggressive caching of large datasets
7. **Server Components**: Use React Server Components for initial data loading
8. **Streaming**: Use streaming SSR for large data sets
9. **Consistent Function Returns**: TypeScript ensures type safety and consistent returns

### Redis Cache Strategy

**When to Cache**:
- Large bill lists (> 100 records)
- Frequently accessed customer data
- Report results
- Dashboard metrics
- Aggregated data

**When to Invalidate**:
- After bill assignment
- After activity logging
- After status changes
- On admin clear cache action
- After nightly data sync

**Implementation Pattern**:
```typescript
// Example API route with caching
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const filters = searchParams.toString();
  
  const cacheKey = CACHE_KEYS.BILLS_LIST(filters);
  
  const data = await getCached(
    cacheKey,
    async () => {
      // Expensive database query
      return await fetchBillsFromDatabase(filters);
    },
    CACHE_TTL.BILLS_LIST
  );
  
  return Response.json(data);
}
```

### Compliance & Best Practices

1. **FDCPA Compliance**: Collection activity tracking supports compliance documentation
2. **Data Retention**: Configurable retention policies for activity logs
3. **Backup Strategy**: Daily automated backups of collections database
4. **Error Handling**: Error boundaries and graceful degradation
5. **Testing**: 
   - Unit tests with Jest
   - Integration tests with Playwright
   - API tests with Supertest
6. **Type Safety**: Full TypeScript coverage
7. **Code Quality**: ESLint + Prettier configuration

### Feature Priorities (Phase 1 MVP)

1. ✅ User authentication with NextAuth.js
2. ✅ Collection queue display with aging buckets
3. ✅ Customer detail view with bill list
4. ✅ Activity logging (who, when, how, what's next)
5. ✅ Task management (follow-ups, reminders)
6. ✅ Basic reporting (aging, activity summary)
7. ✅ Move customer between queues
8. ✅ CSV export
9. ✅ Exact matching for text filters
10. ✅ Bill assignment to users with role-based filters
11. ✅ Display total unpaid balance
12. ✅ Redis caching for large datasets
13. ✅ Clear cache functionality for admins
14. ✅ Special conditions display
15. ✅ Customer contact information display

### Future Enhancements (Phase 2+)

- Mail merge templates and automation
- Payment plan setup and tracking
- Automated email/SMS notifications
- Advanced forecasting and risk scoring
- Integration with payment processing
- Mobile app with React Native
- AI-assisted contact recommendations
- Real-time collaborative features
- Advanced dashboard visualizations
- Webhooks for external integrations

## Development Guidelines

### Code Style

- Follow Airbnb TypeScript style guide
- Use functional components with hooks
- Prefer server components over client components
- Keep components small and focused (< 200 lines)
- Use descriptive variable names
- Document complex logic with comments

### TypeScript Patterns

```typescript
// Type definitions
export interface Bill {
  itemIdentifier: string;
  billId: string;
  number: string;
  category: string;
  customerName: string;
  billedAmount: number;
  unpaidBalance: number;
  year: number;
  dueDate: Date;
}

// API response type