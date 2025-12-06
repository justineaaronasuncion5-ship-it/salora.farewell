# FAQ Chatbot Integration - TODO

Context:
- File: funservproj/MAIN(CLICK HERE).html
- Goal: Add a chatbot within the FAQ section that only answers questions about this page’s content.

Plan Steps and Status:
- [x] Gather requirements and propose implementation plan
- [x] Get plan approval

Implementation Tasks:
- [ ] Insert chatbot UI container under the FAQ heading (#faq)
- [ ] Add CSS styles consistent with theme (background #ffffff, text #2f4963, accent #d79a29)
- [ ] Implement client-side knowledge base built strictly from DOM:
  - [ ] FAQ Q/A pairs
  - [ ] Services summary (Burial, Cremation, Online Memorial)
  - [ ] Contact details (phone, email, address, 24/7 availability)
  - [ ] Grief &amp; Support links summary (Grief Share, PMHA, MentalHealthPH)
  - [ ] Obituaries feature (search + pagination instructions)
  - [ ] Flowers (names + prices)
- [ ] Retrieval/matching logic:
  - [ ] Normalize (lowercase, punctuation removal, stopwords)
  - [ ] Token overlap matching + exact substring bonus
  - [ ] Synonym map (price/cost/fee, phone/contact/number, address/location, hours/time/open/24/7)
  - [ ] Thresholding with fallback message if out-of-scope
- [ ] Interactions:
  - [ ] Enter to send + Send button
  - [ ] Optional quick suggestion chips
  - [ ] Add second listener on .faq-chip to auto-ask via chat (without changing existing behavior)
- [ ] Accessibility:
  - [ ] ARIA roles/labels for chat, input, and message list
  - [ ] Maintain focus order and keyboard support

Testing Checklist:
- [ ] Ask: “What services do you offer?”
- [ ] Ask: “How much does cremation cost?”
- [ ] Ask: “What is your contact number and email?”
- [ ] Ask: “Where are you located?”
- [ ] Ask: “When are you open?”
- [ ] Ask: “How do I search obituaries?”
- [ ] Ask: “What are the flower prices?”
- [ ] Out of scope: “What’s your Facebook page’s latest post?” (should respond with in-scope message)
- [ ] Click a FAQ chip and verify it triggers a chatbot response and also toggles the FAQ answer visibility

Notes:
- No external APIs or network calls will be used for the chatbot.
- All logic runs client-side and derives answers from the current DOM, ensuring it only responds with information present on this page.
