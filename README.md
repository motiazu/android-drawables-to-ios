# iosdrawable

Converts an Android drawable resources to ios/reactnative naming format by the following rules:

```
'drawable-mdpi': '@1x',
'drawable-hdpi': '@1.5x',
'drawable-xhdpi': '@2x',
'drawable-xxhdpi': '@3x',
'drawable-xxxhdpi': '@4x'
```

## Installation
To install just run this in terminal 
`npm install iosdrawable -g`

## Usage
Go to desired folder that contains the drawable-xxxxxx folders, and run 
`iosdrawable`