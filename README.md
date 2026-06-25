# OGCC

Ohio Gyatt Compliance Check: a cursed captcha-style widget that verifies whether the user is Gen Alpha.

The app runs a short series of Gen Alpha-coded challenges. Each challenge contributes a partial correctness score; the session passes when the total score reaches the pass threshold, fails when it drops below the minimum, and asks for a retry if the available challenges run out in the unclear middle zone.

## Challenge Types

OGCC currently supports these challenge types:

### Single-choice poll

A text challenge with one correct option.

Example: "Which phrase means the vibe is cooked?"

### Image choice poll

A challenge where the user chooses one image from a set.

Example: "Which image shows the phone at 1%?"

### Point selection

An image challenge where the user clicks or taps a specific point.

Example: "Tap the share button before the chat moves on."

### Image parts selection

A grid challenge where the user selects every image cell containing a requested object.

Example: "Select every square with the charger cable."

### Ordering

A challenge where the user arranges text or image items in order.

Example: "Order these apps from daily ritual to forgotten relic."
