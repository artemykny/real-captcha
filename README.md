# OGCC

Ohio Gyatt Compliance Check: a cursed captcha-style widget that verifies whether the user's aura is acceptable.

The app runs a short series of challenges. Each challenge contributes a partial correctness score; the session passes when the total score reaches the pass threshold, fails when it drops below the minimum, and asks for a retry if the available challenges run out in the unclear middle zone.

## Challenge Types

OGCC currently supports these challenge types:

### Single-choice poll

A text challenge with one correct option.

Example: "Which shape has three sides?"

### Image choice poll

A challenge where the user chooses one image from a set.

Example: "Which image shows a traffic light?"

### Point selection

An image challenge where the user clicks or taps a specific point.

Example: "Click the door handle."

### Image parts selection

A grid challenge where the user selects every image cell containing a requested object.

Example: "Select all image parts with a fire hydrant."

### Ordering

A challenge where the user arranges text or image items in order.

Example: "Order these images from smallest animal to largest animal."
