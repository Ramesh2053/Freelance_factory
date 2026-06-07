# FreelanceFactory

**Where every skill finds its perfect match.**

A fully functional freelance marketplace web application built with HTML, CSS, and JavaScript. Connects freelancers with clients featuring secure escrow payments, messaging, reviews, and dispute resolution.

## Quick Start

1. Open the project folder
2. Launch a local server (required for full functionality):

```bash
# Python
python -m http.server 8080

# Node.js (if npx available)
npx serve .
```

3. Visit `http://localhost:8080`

## Demo Accounts

Seeded demo users (password: `demo123`):

| Role | Email |
|------|-------|
| Freelancer | sarah.chen@demo.com |
| Freelancer | rajesh.thapa@demo.com |
| Client | himaltechsolutions@company.com |

## Features

- **Public pages:** Landing, About, How It Works, Contact, Terms, Privacy
- **Authentication:** Sign up (Freelancer/Client), OTP verification, Login, Profile setup
- **Freelancer:** Dashboard, browse jobs, apply, submit work, messaging, reviews
- **Client:** Dashboard, post jobs, hire freelancers, escrow payment, approve work
- **Core flows:** Escrow payments (Khalti/eSewa), work submission/approval, ratings, disputes
- **Responsive design** with brand colors and Poppins/Inter typography

## Tech Stack

- HTML5, CSS3, Vanilla JavaScript
- localStorage for data persistence (no backend required)
- Google Fonts (Poppins, Inter)

## Project Structure

```
Freelance_factory/
├── index.html              # Landing page
├── about.html              # About page
├── how-it-works.html       # Process guides
├── contact.html            # Contact form
├── terms.html / privacy.html
├── login.html / signup.html / verify-otp.html
├── profile-setup.html
├── dashboard-freelancer.html / dashboard-client.html
├── browse-freelancers.html / browse-jobs.html
├── profile-freelancer.html / profile-client.html
├── job-post.html / job-details.html / job-apply.html
├── messages.html
├── payment.html / escrow-confirmation.html
├── work-submit.html / work-approval.html
├── review.html / dispute.html / settings.html
├── css/styles.css
└── js/
    ├── storage.js          # Database layer
    ├── auth.js             # Authentication
    ├── utils.js            # Helpers
    └── components.js       # Shared UI
```

## Reset Data

Open browser console and run:

```javascript
Store.resetDB();
location.reload();
```
