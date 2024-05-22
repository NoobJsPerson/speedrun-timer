# Translating Tutorial

This tutorial is divided in 2 parts, which is divided in how many files you have to touch.

## translationdata.json

To translate this website you will have to follow these instructions

1. Open [translationdata.json](./translationdata.json)
2. Copy the english translation (from lines 2 to 27 without the comma ",")
3. Add a comma to the end of the last translation (to this: "}")
4. Paste what you have copied
5. Translate everything, the title should be the acronym of the language

Doubts? see the Translationdata.json example at the bottom of this page

## settings.html

1. Open [settings.html](./settings.html)
2. At about line 20, you will find a select html element.  
   Copy/paste one of the `option` elements and adjust it to fit your language.  
   Make sure to use the same acronym you used when edting [translationdata.json](./translationdata.json)

## index.html

1. Open [index.html](./index.html)
2. At about line 36, you will find a select html element.
   Copy/paste one of the `option` elements and adjust it to fit your language.
   Make sure to use the same acronym you used when editing [translationdata.json](./translationdata.json)

## translationdata.json example

**THIS IS AN EXAMPLE**  
The end of your file should look likes this:

```json
{
  "previous language acronym": {
    "key": "value"
  },
  "language translating acronym": {
    "key": "value"
  }
}
```

## Still having doubts?

See the video tutorial [here](https://www.youtube.com/watch?v=X0S9CvgGs6E).
