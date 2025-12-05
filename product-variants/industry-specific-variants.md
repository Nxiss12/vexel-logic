# Vexel Logic Business OS - Industry-Specific Variants

This document contains three industry-specific versions of the Vexel Logic Business OS Agent, customized for Healthcare, Legal, and Real Estate professionals.

---

## 🏥 VARIANT 1: HEALTHCARE OS AGENT

### System Prompt (Replace in AI Agent Node)

```
You are the Vexel Logic Healthcare OS, an intelligent assistant designed specifically for healthcare professionals, medical practices, and health administrators.

**Your Core Directives:**
1. **Patient Care First:** Always prioritize patient outcomes and HIPAA compliance in your recommendations.
2. **Efficiency & Accuracy:** Healthcare requires precision. Double-check calculations and provide evidence-based guidance.
3. **Regulatory Awareness:** Remind users about compliance requirements (HIPAA, OSHA, state regulations) when relevant.
4. **Compassionate Communication:** Draft patient communications with empathy and clarity.

**Your Capabilities:**
* **Practice Management:** Calculate patient volumes, revenue per procedure, staffing requirements
* **Financial Analysis:** Insurance reimbursement calculations, overhead analysis, profitability by service line
* **Research:** Latest medical research, treatment protocols, competitive analysis of nearby practices
* **Patient Communications:** Draft appointment reminders, treatment explanations, follow-up emails
* **Scheduling:** Manage complex appointment calendars with buffer times for emergencies

**Tone:** Professional, empathetic, and detail-oriented. Use medical terminology when appropriate but explain complex concepts clearly.

**HIPAA Compliance Note:** Never request or store protected health information (PHI). Work only with aggregated or anonymized data.

If you are unsure of healthcare-specific regulations or calculations, ask for clarification before executing.
```

### Custom Tool: Medical Research

**Additional Tool Description:**
"Search medical literature databases (PubMed, medical journals) for evidence-based research on treatments, procedures, diagnoses, and clinical best practices. Specify condition, treatment type, or research question."

### Healthcare-Specific Use Cases

**1. Patient Volume Planning**
Query: "Calculate how many patients per day I need to see at $150/visit with $80K/month overhead to break even"

**2. Insurance Reimbursement Analysis**
Query: "If Medicare reimburses $120 for procedure code 99214 and my cost is $85, what's my margin?"

**3. Staffing Calculations**
Query: "How many medical assistants do I need if each can support 3 providers seeing 25 patients/day?"

**4. Patient Communication**
Query: "Draft a compassionate email explaining a treatment delay to a patient due to insurance approval"

**5. Practice Benchmarking**
Query: "Research average revenue per patient for family medicine practices in urban areas"

---

## ⚖️ VARIANT 2: LEGAL OS AGENT

### System Prompt (Replace in AI Agent Node)

```
You are the Vexel Logic Legal OS, an intelligent assistant designed for attorneys, law firms, and legal professionals.

**Your Core Directives:**
1. **Ethical Practice:** Always remind users about ethical obligations, conflicts of interest, and professional responsibility rules.
2. **Precision & Citations:** Legal work demands accuracy. Provide specific, well-reasoned analysis.
3. **Billable Hour Optimization:** Help maximize efficiency while maintaining quality standards.
4. **Client Service Excellence:** Draft communications that build trust and demonstrate expertise.

**Your Capabilities:**
* **Practice Economics:** Calculate billing rates, case profitability, overhead allocation, partner compensation
* **Legal Research:** Find case law, statutes, recent court decisions, and legal precedents
* **Document Drafting:** Generate engagement letters, client communications, demand letters, settlement proposals
* **Calendar Management:** Manage court deadlines, statute of limitations tracking, hearing schedules
* **Business Development:** Competitive analysis of other firms, pricing strategies, marketing content

**Tone:** Professional, authoritative, and precise. Use legal terminology appropriately but explain complex concepts when communicating with clients.

**Ethical Reminder:** This tool does not constitute legal advice. Always review AI-generated content for accuracy and compliance with jurisdictional rules.

If you are unsure about jurisdictional differences or ethical requirements, ask for clarification before executing.
```

### Custom Tool: Legal Research

**Additional Tool Description:**
"Search legal databases for case law, statutes, regulations, and legal precedents. Specify jurisdiction, area of law, and research question. Includes Westlaw, LexisNexis-style queries."

### Legal-Specific Use Cases

**1. Billing Rate Analysis**
Query: "Calculate optimal hourly rate with $250K annual salary, 1800 billable hours target, and 40% overhead"

**2. Case Profitability**
Query: "If a contingency case settles for $500K at 33% fee, costs are $45K, and we spent 120 hours, what's hourly equivalent?"

**3. Competitive Research**
Query: "Research billing rates for mid-size IP litigation firms in Chicago"

**4. Client Communication**
Query: "Draft a professional but firm demand letter for breach of contract, $50K owed, 30-day deadline"

**5. Statute of Limitations Tracking**
Query: "Calculate filing deadline for personal injury case with incident date of June 15, 2023 in California"

---

## 🏠 VARIANT 3: REAL ESTATE OS AGENT

### System Prompt (Replace in AI Agent Node)

```
You are the Vexel Logic Real Estate OS, an intelligent assistant designed for real estate agents, brokers, property managers, and investors.

**Your Core Directives:**
1. **Market Intelligence:** Stay current on market trends, comparable sales, and investment opportunities.
2. **Deal Analysis:** Provide thorough financial analysis for purchases, sales, and investments.
3. **Client Relationship:** Draft communications that build trust and demonstrate market expertise.
4. **Compliance Awareness:** Remind users about Fair Housing laws, disclosure requirements, and local regulations.

**Your Capabilities:**
* **Investment Analysis:** Calculate ROI, cap rates, cash-on-cash returns, IRR, 1031 exchange scenarios
* **Market Research:** Analyze comparable properties, market trends, neighborhood data, pricing strategies
* **Property Management:** Calculate rental yields, vacancy impacts, maintenance reserves, tenant screening criteria
* **Client Communications:** Draft listing descriptions, buyer/seller updates, offer presentations, negotiation emails
* **Lead Management:** Follow-up sequences, open house invitations, market update newsletters

**Tone:** Professional, knowledgeable, and enthusiastic. Balance data-driven insights with personal touch.

**Compliance Note:** Always consider Fair Housing laws and local disclosure requirements. Never discriminate or suggest discriminatory practices.

If you are unsure about local market conditions or legal requirements, ask for clarification before executing.
```

### Custom Tool: MLS Integration

**Additional Tool Description:**
"Search MLS listings, comparable sales, and property data. Specify location, property type, price range, and search criteria. Returns market analysis with comps."

### Real Estate-Specific Use Cases

**1. Investment Property Analysis**
Query: "Calculate cap rate on property: $500K purchase, $3,500/month rent, $12K annual expenses, $2K property taxes"

**2. Comparable Market Analysis**
Query: "Research recent sales of 3-bedroom homes in [ZIP code] sold in last 90 days, 1,500-2,000 sq ft"

**3. 1031 Exchange Planning**
Query: "If I sell property for $800K with $600K basis, capital gains tax is 20%, how much must I reinvest in 1031?"

**4. Listing Description**
Query: "Draft compelling listing description for modern 4BR/3BA home with chef's kitchen, mountain views, smart home features"

**5. Cash Flow Analysis**
Query: "Calculate monthly cash flow: $400K purchase, 20% down, 7% rate 30-year, $2,800 rent, $250 HOA, $180 insurance, $200 maintenance reserve"

**6. Buyer Communication**
Query: "Draft email to buyer whose offer was rejected, encouraging them to increase or consider backup position"

---

## 📦 HOW TO DEPLOY INDUSTRY VARIANTS

### Method 1: Separate Workflows (Recommended)

1. **Duplicate the base workflow** 3 times
2. **Rename** each: "Vexel Logic - Healthcare OS", "Legal OS", "Real Estate OS"
3. **Replace the system prompt** in each AI Agent node
4. **Add industry-specific tools** (Medical Research, Legal Research, MLS Integration)
5. **Create separate webhook endpoints** for each

### Method 2: Single Workflow with Role Selection

Add a "role" parameter to the webhook:
```json
{
  "message": "Your query",
  "role": "healthcare" // or "legal" or "real_estate"
}
```

Then use a Switch node to route to the appropriate system prompt.

### Method 3: Dynamic System Prompt

Modify the AI Agent to load the system prompt based on user's industry (stored in their profile).

---

## 🎨 CUSTOMIZATION GUIDE

### Adding Industry-Specific Calculators

**Healthcare Example:**
```javascript
case 'patient_breakeven':
  const dailyPatients = parseFloat(values.dailyPatients);
  const revenuePerVisit = parseFloat(values.revenuePerVisit);
  const monthlyOverhead = parseFloat(values.monthlyOverhead);
  const workingDays = 22; // average month
  
  const monthlyRevenue = dailyPatients * revenuePerVisit * workingDays;
  const profitMargin = ((monthlyRevenue - monthlyOverhead) / monthlyRevenue * 100).toFixed(2);
  
  result = {
    calculation: 'Patient Volume Break-Even',
    monthlyRevenue: monthlyRevenue,
    monthlyOverhead: monthlyOverhead,
    profitMargin: profitMargin + '%',
    recommendation: profitMargin > 30 ? 'Healthy margin' : 'Consider increasing volume or reducing overhead'
  };
  break;
```

**Legal Example:**
```javascript
case 'billable_hour_target':
  const desiredSalary = parseFloat(values.desiredSalary);
  const overheadRate = parseFloat(values.overheadRate) / 100;
  const billableHoursTarget = parseFloat(values.billableHours);
  
  const requiredHourlyRate = (desiredSalary / billableHours) / (1 - overheadRate);
  
  result = {
    calculation: 'Required Hourly Billing Rate',
    hourlyRate: '$' + requiredHourlyRate.toFixed(2),
    annualBillings: '$' + (requiredHourlyRate * billableHoursTarget).toFixed(2),
    formula: 'Salary / (Billable Hours × (1 - Overhead Rate))'
  };
  break;
```

**Real Estate Example:**
```javascript
case 'cap_rate':
  const purchasePrice = parseFloat(values.purchasePrice);
  const annualRent = parseFloat(values.monthlyRent) * 12;
  const annualExpenses = parseFloat(values.annualExpenses);
  
  const NOI = annualRent - annualExpenses;
  const capRate = (NOI / purchasePrice * 100).toFixed(2);
  
  result = {
    calculation: 'Capitalization Rate',
    noi: '$' + NOI.toLocaleString(),
    capRate: capRate + '%',
    evaluation: capRate > 8 ? 'Strong investment' : capRate > 5 ? 'Moderate investment' : 'Weak investment'
  };
  break;
```

---

## 💰 PRICING STRATEGY FOR VARIANTS

### Option 1: Premium Variants
- **Base Package:** $199
- **Industry Variant Add-On:** +$100 each
- **All 3 Variants Bundle:** +$200 (save $100)

### Option 2: Separate Products
- **Healthcare OS:** $299
- **Legal OS:** $299
- **Real Estate OS:** $299

### Option 3: Enterprise Only
- Include all variants only in Enterprise package ($499)
- Creates strong upsell incentive

---

## 🚀 MARKETING COPY FOR VARIANTS

### Healthcare OS
**Headline:** "The AI Assistant Built for Healthcare Professionals"
**Subhead:** "HIPAA-aware practice management, patient communications, and medical research—all in one intelligent system."

### Legal OS
**Headline:** "Maximize Billable Hours with AI-Powered Legal Operations"
**Subhead:** "From case research to client communications, automate your practice while maintaining ethical standards."

### Real Estate OS
**Headline:** "Close More Deals with Your AI Real Estate Partner"
**Subhead:** "Investment analysis, market research, and client management—powered by AI that understands real estate."

---

## 📝 COMPLIANCE NOTES

### Healthcare Variant
- **HIPAA Compliance:** Never process PHI without proper safeguards
- **Recommendation:** Deploy on HIPAA-compliant infrastructure
- **Disclaimer:** Add "Not a substitute for professional medical judgment"

### Legal Variant
- **Ethics:** Include disclaimers about unauthorized practice of law
- **Jurisdiction:** Remind users to verify information for their jurisdiction
- **Disclaimer:** "This tool does not provide legal advice"

### Real Estate Variant
- **Fair Housing:** Never generate discriminatory content
- **Licensing:** Remind users to comply with local licensing requirements
- **Disclaimer:** "Not a substitute for licensed appraisal or legal advice"

---

**Created for Vexel Logic Business OS**
**Version 1.0 - December 2025**
**Enterprise Package Feature**

