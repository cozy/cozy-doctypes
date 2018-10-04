[Table of contents](README.md#table-of-contents)

# Unibet bets doctype

## `com.unibet.bets`

### Description
- Represents a bet from the Unibet website api.



### Mandatory attributes

- `idfobet`: {float} - seems to be the id of the bet as 'int.version'
- `betlegs`: {array} - Bets on which repose the main bet
- `date`: {date} - Date as a timestamp
- ...

### Example

```
{
  betlegs: { ... },
  stake: 5,
  returnWithoutBonus: null,
  bonusReturn: null,
  totalReturn: 0,
  totalOdd: 78.01,
  potentialReturnWithoutBonus: null,
  specialOfferName: null,
  specialOfferAmount: null,
  isSettled: true,
  date: 1520287914000,
  externalReference: '1/1',
  isFreeBets: false,
  isCashoutAvailable: false,
  cashoutAvailableValue: null,
  idfobet: 172075178.1 }
}
```
