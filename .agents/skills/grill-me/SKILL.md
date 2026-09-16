---
name: grill-me
description: >-
  A relentless interview to sharpen a plan, decision, or idea before implementation.
  Use when the user invokes /grill-me, asks to be grilled, or wants to stress-test their thinking.
---

# Grill Me

Take a loose idea, plan, or design and interview the user relentlessly until reaching a shared, rigorous understanding. Map the domain as a **design tree** where every decision branches into the decisions that hang off it.

For detailed background and rationale, see [guide.md](./references/guide.md).

---

## Core Process

### 1. Work in Rounds along the Frontier
- The **frontier** is every decision whose prerequisites are already settled: the questions you can ask *now* without guessing at answers you haven't heard yet.
- Ask the **entire frontier** in one round.
- Number each question, explain context/options clearly, and **always provide your recommended answer**.
- Wait for the user's answers before generating the next round.
- A question whose answer depends on another question that is still open in this round belongs to a *later* round, not this one.

### 2. Format of Each Round

Format questions consistently:

```markdown
❓ **Q1** - **<Question Title>**: <Question explanation, trade-offs, or multiple choice options>

➡️ **Recommendation**: <Your recommended answer and rationale>

---

❓ **Q2** - **<Question Title>**: <Question explanation, trade-offs, or multiple choice options>

➡️ **Recommendation**: <Your recommended answer and rationale>
```

### 3. Fact-Finding vs Decisions
- **Facts are your job, never the user's**: When a frontier question needs information from the codebase, tools, or environment, look it up or inspect it yourself. Do not ask the user for facts you can determine.
- **Decisions belong to the user**: Put each decision to the user with clear context, trade-offs, and your recommendation.

### 4. Grillable vs Ungrillable Questions
- Some questions cannot be resolved by debate alone (e.g., visual aesthetic nuances, detailed interaction feel).
- Recognize when a question is **ungrillable**. When hitting an ungrillable question, propose a quick prototype or minimal experiment rather than spiraling in speculative discussion.

### 5. Completion Criteria
- The grilling session finishes when the **frontier is empty**: every branch of the design tree has been visited and nothing is left silently assumed.
- Summarize the resolved decisions clearly.
- **Do not act on or write implementation code** until the user explicitly confirms that a shared understanding has been reached.
