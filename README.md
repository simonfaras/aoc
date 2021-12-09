# Instructions

If no puzzle is found for the current day a folder with relevant files will be created.

The runner is controlled by the `config.ts` file in the puzzle folder.

Setting the exported value `sample` controls which local `sample_{n].txt` file is used.
Setting the exported value `active` controls which puzzle is executed.

When the output of the puzzle match the exported `expected[active]` a new run with the contents of `input.txt` will be executed.

## Todays puzzle

```
npm start
```

## Some other day

```
npm start -- [day] [year]
```

Example
Start day `08` of current year

```
npm start -- 08
```

Example
Start day `08` of year `2020`

```
npm start -- 08 2020
```
