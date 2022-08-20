
This game is developed just for the purpose of learning

Developed by following [this](https://www.youtube.com/watch?v=Koi1Y_Gb_js) titorial on youtube

This is a tic-tac-toe game, it has 3 modes:
1. Local - no bot involved, you will be playing against yourself
2. Easy - your opponent would be a bot - which will only defend itself (if you are winning it would stop you)
3. Medium - your opponent would be a bot - which will both attack and defend itself (it would try to win and also stop you from winning)

## Requirements 
These steps are for Mac
1. [Homebrew](https://brew.sh/)
    ```
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    ```
Add it to PATH (just follow the steps shown after the above command)

2. Git 
   ```
   bew install git
   ```
3. Node - will also install npm 
    ```
    brew install node
    ```
4. Watchman - will update your app when you save
   ```
   brew install watchman
   ```
5. Xcode - you will be able to see your app on your Iphone
6. Ruby
    ```
    brew install ruby
    ```
7. React Native
   ```
   npm i react-native
   ```

## How to run
Clone the repository and run:
```
npm start . 
```