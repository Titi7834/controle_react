<h1>Projet Contrôle REACT</h1>

<h2>Fonctionnement du site</h2>
<div>
  Afin d'avoir un site fonctionnel il faut impérativement react, react-router-dom, react-hot-toast :
<code>
    npm install react
    npm install react-router-dom
    npm install react-hot-toast
</code>
  Pour pouvoir lancer le site il faut éxecuter la commande suivante :
<code>
    npm run dev
</code>
</div>

<h2>App.tsx</h2>
<div>
  Dans App.tsx on a l'appel des routes nécessaires au projet.
</div>

<h2>main.tsx</h2>
<div>
  On a l'appel de App afin de pouvoir tout afficher sur le site.
</div>

<h2>Data.tsx</h2>
<div>
  Permet d'appeler l'API https://dummyjson.com/users afin de récupérer tous les users on ajoute ?limit=0 afin de récupérer toutes les entrées.
</div>

<h2>User.tsx</h2>
<div>
  C'est la classe user qui permet de stocker les informations de chaque user et de ne pas aller les récupérer tout le temps dans l'API.
</div>

<h2>UserList.tsx</h2>
<div>
  Permet de filtrer des informations et afficher les différents modules.
</div>

<h2>UserCard.tsx</h2>
<div>
  Permet d'afficher toutes les cards des users pour l'affichage général et l'appel UserDetail pour les détails de chaque card.
</div>

<h2>UserDetail.tsx</h2>
<div>
  Permet d'afficher les détails d'un utilisateur en particulier.
</div>

<h2>Theme</h2>
<div>
  Permet de gérer le thème de l'écran grâce à un bouton et la conservation de l'état.
</div>

<h2>Search</h2>
<div>
  Permet d'afficher une barre de recherche qui vérifie dans les noms, prénoms et email afin de trouver l'user voulu. Il y a également le tri qui est fait ici.
</div>