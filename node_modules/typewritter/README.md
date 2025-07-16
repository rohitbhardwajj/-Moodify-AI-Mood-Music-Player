# typewritter

## _new lightweight react typscript package_

## Installation

Installation guidlines.

```sh
npm i typewritter
```

### Example

```sh
import {TypeWritter} from 'typewritter';
function App() {
  return (
      <TypeWritter text="Hi This is a new typewritting package in typescript!!" speed={100} fontSize={16} clearMessageSpeed={30} loop={true} />
  );
}

export default App;

```

## Props and their details

| PROPS             | Details                         | Type    |
| ----------------- | ------------------------------- | ------- |
| text              | message string                  | string  |
| speed             | typing effect speed (in ms)     | number  |
| fontSize          | font size of the typing message | number  |
| clearMessageSpeed | clearing message speed (in ms)  | number  |
| loop              | is typing effect should repeat  | boolean |

## License

ISC
