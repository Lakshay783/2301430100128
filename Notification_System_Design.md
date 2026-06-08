# Notification System Design Documentation

## Overview of the Ranking Strategy
The ranking strategy is designed to prioritize notifications based on their significance to the user. We combine two primary factors: the **Category Score** (intrinsic importance) and the **Freshness Score** (relevance over time). This ensures that critical new updates appear at the top, while older or less critical notifications naturally move down the list.

## Priority Score Calculation
The final score is calculated using the following formula:
`Priority Score = Category Score + Freshness Score`

### 1. Category Score (Base Score)
Each notification category is assigned a fixed number of points based on its importance:
- **Placement**: 100 points
- **Result**: 70 points
- **Event**: 40 points

### 2. Freshness Score
Freshness is calculated based on the notification's timestamp relative to the current time. 
- A notification starts with a maximum Freshness Score of **100**.
- For every hour that passes since the notification was created, the freshness score decreases.
- **Formula**: `Freshness Score = Max(0, 100 - AgeInHours)`
- This ensures that a very recent 'Event' (40 + ~100 = 140) might temporarily outrank an older 'Result' (70 + <70).

## Method used to select Top Notifications
The system retrieves all available notifications from the API, calculates the `Priority Score` for each, and then:
1. Sorts the list in **descending order** of the score.
2. Slices the array based on the user's preference (Top 10, 15, or 20).
3. Re-calculates scores on every page load or when the limit is changed to ensure the order is always up-to-date.

## Assumptions Made
1. **Timestamp field**: The API may return timestamps in various formats (e.g., `timestamp` or `date`). The system handles ISO 8601 strings.
2. **Score Degradation**: The freshness degradation rate of 1 point per hour was chosen to provide a balance between category importance and temporal relevance.
3. **Frontend-Only**: No server-side sorting or persistence was implemented as per the requirements.
4. **Data Availability**: The system assumes the API endpoint provided is accessible and returns a JSON array of notification objects.
