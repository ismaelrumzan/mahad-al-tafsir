## Setting up the repo locally
- Clone the repo locally
- Go inside the repo's directory
```
git clone https://github.com/ismaelrumzan/mahad-al-tafsir.git
cd mahad-al-tafsir
```

## Work on an issue/improvement
From the `main` branch, fetch the latest and merge if there are new changes pulled
```
git checkout main
git fetch -p origin
git merge origin/main
```
Create a new branch with a short title related to the issue, such as, `fix-player-loader`, `feature-design-home`
```
git checkout -b fix-player-loader
```
## Preview your changes locally

- Run `npm -i` or `npm install`
- Run `npm start`and the browser will open to `http://localhost:3000/`
- Now, you can update your code in the branch and see the changes in the browser

## Preview your changes as a preview link on Vercel

Note: You cannot push directly to `main`. You have to push your changes to your branch and then create a pull request
- You can preview your changes on Vercel without a PR. 
- Let's say your branch name is `feature-design-home`
- After you have pushed your changes to remote, at least once, your deployment link for that branch will always be `https://mahad-al-tafsir-git-feature-design-home-ismaelrumzan.vercel.app/`
