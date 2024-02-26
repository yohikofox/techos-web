
task                                                                                                                 | status | comment
---------------------------------------------------------------------------------------------------------------------|--------|--------
infinite scroll                                                                                                      |        |
revoir le style des tags (icons)                                                                                     |        |
Caler le header (responsive)                                                                                         |        |
share dans les réseaux                                                                                               |        |
page QSN                                                                                                             |        |
ajouter des inserts dans les posts                                                                                   |        |
progress bar scroll                                                                                                  |        |
share in header                                                                                                      |        |
Commentaires ?                                                                                                       |        |
pas mettre deux headers dans la page de recherche (garder le placeholder)                                            |        |
plugin strapi de notifications                                                                                       |        |
add jwt token to notify api                                                                                          |        |
Check pourquoi et comment SSR VS SSG vs ISR                                                                          |        |
revoir l'algo de resolution ads                                                                                      |        |
Faire en sorte de pouvoir ajouter des blocs dans un article depuis strapi                                            |        |
Essayer un curseur de scrollbar proéminent                                                                           |        |
Checker les réponses de Strapi sur [DISCORD](https://discordapp.com/channels/811989166782021633/1148175390515405021) |        |
remove tailwind                                                                                                      |        |
faire une fonction recursive pour les imports de style (bundles.scss)                                                |        |
ajouter un bundler pour le next.config.js                                                                            |        |
Create a CLI to scaffold useCases                                                                                    |        |
migrer les domaines en class/entities, les types ne permettent pas les tests `instanceof`
mieux gèrer les erreurs dans les pages web
# A creuser 


```
the resource http://localhost:3000/_next/static/css/app/(main)/page.css?v=1692147705108 was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally.
```

# SEO (by chatGPT)

Voici quelques suggestions pour améliorer le SEO de votre site web en fonction du code source que vous avez partagé :

1. **Optimisation des balises Meta** : Assurez-vous que chaque page de votre site a une balise meta titre et une balise meta description unique, pertinente et descriptive. Ces balises sont importantes pour les moteurs de recherche et peuvent affecter la manière dont vos pages sont perçues et classées.
    
2. **Optimisation des images** : Compresser et optimiser les images peut améliorer les temps de chargement de vos pages. Utilisez des noms de fichiers descriptifs et des balises alt pour vos images, cela aide à améliorer le SEO.
    
3. **Amélioration de la structure de l'URL** : Utilisez des URL propres et descriptives pour vos pages. Évitez les chaînes de caractères aléatoires et utilisez plutôt des mots clés pertinents pour décrire le contenu de la page.
    
4. **Optimisation du contenu** : Fournissez du contenu de qualité, bien structuré et pertinent pour vos utilisateurs. Utilisez des en-têtes (H1, H2, H3) pour structurer votre contenu et incorporez des mots clés pertinents.
    
5. **Utilisation des microdonnées** : Ajoutez des microdonnées (également appelées "données structurées") à votre site pour aider les moteurs de recherche à comprendre votre contenu. Les microdonnées peuvent être utilisées pour marquer des éléments tels que les adresses, les avis, les horaires d'ouverture, etc.
    
6. **Optimisation pour mobile** : Assurez-vous que votre site est responsive et fonctionne bien sur les appareils mobiles. Les moteurs de recherche favorisent les sites qui offrent une bonne expérience sur mobile.
    
7. **Amélioration de la vitesse du site** : Les temps de chargement lents peuvent affecter votre classement dans les moteurs de recherche et la satisfaction de vos utilisateurs. Utilisez des outils de test de vitesse pour identifier et corriger les problèmes qui ralentissent votre site.
    
8. **Mise en place de SSL** : Si votre site ne l'utilise pas déjà, envisagez de passer à HTTPS. Les moteurs de recherche favorisent les sites sécurisés, et cela améliore également la confiance des utilisateurs.
    
9. **Création d'un fichier sitemap** : Créez un fichier sitemap et soumettez-le aux moteurs de recherche. Cela aide les moteurs de recherche à comprendre la structure de votre site et à indexer vos pages plus efficacement.
    
10. **Optimisation des liens internes** : Utilisez des liens internes pour aider les moteurs de recherche et les utilisateurs à naviguer sur votre site. Assurez-vous que vos liens sont pertinents et utiles pour les utilisateurs.
    
11. **Amélioration de la qualité des liens entrants** : Obtenez des liens de qualité en provenance de sites pertinents et de confiance. Évitez les techniques de spam et concentrez-vous sur la création de contenu de qualité qui attire naturellement des liens.
    
12. **Optimisation des balises H1, H2, et H3** : Assurez-vous que chaque page a une balise H1 unique et pertinente qui décrit le contenu de la page. Utilisez des balises H2 et H3 pour structurer votre contenu et améliorer la lisibilité.
    

En appliquant ces conseils, vous devriez être en mesure d'améliorer le SEO de votre site web et d'augmenter votre visibilité dans les moteurs de recherche.


## sdfgdfsfgh

Optimiser le référencement naturel (SEO) de ce code source nécessiterait plusieurs actions. Voici une liste de tâches potentielles pour améliorer le SEO basées sur le code que vous avez fourni :

1. **Métadonnées essentielles :**
    
    - Assurez-vous que les balises `<title>` et `<meta name="description">` sont présentes dans l'en-tête de chaque page et qu'elles contiennent des contenus pertinents et uniques pour chaque page.
    - Utilisez la balise `<meta name="robots" content="index, follow">` pour s'assurer que les moteurs de recherche indexent la page.
2. **Optimisation des images :**
    
    - Assurez-vous que l'attribut `alt` de l'image du pied de page est renseigné pour décrire ce que représente l'image.
    - Utilisez des noms de fichiers descriptifs pour les images, par exemple, remplacez "logo.png" par "techos-dev-logo.png" pour plus de clarté.
    - Comprimez les images pour accélérer le temps de chargement de la page sans perdre en qualité.
3. **Optimisation du contenu :**
    
    - Utilisez des balises d'en-tête (`<h1>`, `<h2>`, etc.) de manière logique et hiérarchique pour structurer le contenu.
    - Assurez-vous que le texte visible est riche en mots-clés pertinents, mais évitez le bourrage de mots-clés.
4. **Améliorations sémantiques :**
    
    - Utilisez des éléments sémantiques HTML5 comme `<article>`, `<aside>`, `<nav>`, etc., lorsque c'est pertinent.
    - Utilisez des attributs ARIA pour améliorer l'accessibilité, ce qui peut indirectement bénéficier au SEO.
5. **Optimisation des liens :**
    
    - Assurez-vous que tous les liens internes fonctionnent correctement.
    - Utilisez des textes d'ancrage descriptifs pour les liens plutôt que des phrases génériques comme "cliquez ici".
6. **Optimisation mobile :**
    
    - Assurez-vous que le site est responsive et s'affiche correctement sur les appareils mobiles.
7. **Optimisation de la vitesse :**
    
    - Minimisez le CSS, le JavaScript et les autres ressources.
    - Utilisez la mise en cache pour améliorer les temps de chargement.
    - Considérez l'utilisation d'un Content Delivery Network (CDN) pour servir des ressources.
8. **Balises structurées :**
    
    - Utilisez des données structurées (par exemple, schema.org) pour fournir des informations supplémentaires sur le contenu de la page aux moteurs de recherche.
9. **Plan du site et fichier robots.txt :**
    
    - Assurez-vous d'avoir un fichier `sitemap.xml` à jour et soumettez-le aux moteurs de recherche.
    - Utilisez un fichier `robots.txt` pour guider les robots des moteurs de recherche sur les pages à indexer ou à exclure.
10. **Sécurité :**
    
    - Passez au protocole HTTPS en utilisant un certificat SSL pour renforcer la confiance des utilisateurs et des moteurs de recherche.
11. **Réseaux sociaux :**
    
    - Intégrez des balises Open Graph et Twitter Cards pour optimiser le partage sur les réseaux sociaux.

N'oubliez pas que le SEO ne concerne pas seulement le code, mais aussi le contenu, la qualité des backlinks, l'expérience utilisateur, et d'autres facteurs hors page.



* passer les fonts en variables
* Check footer
* no-wrap sur les titres et les `<pre>`
* Regarder tRPC


import Auth0Provider from "next-auth/providers/auth0";
...
providers: [
  Auth0Provider({
    clientId: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    issuer: process.env.AUTH0_ISSUER
  })
]
...

## Bug :


```
upstream image response failed for /_next/static/media/logo.f769b4b3.png ResponseAborted
    at Object.fetch (node:internal/deps/undici/undici:11457:11)
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
    at async globalThis.fetch (D:\ws\techos-web\node_modules\.pnpm\next@14.0.3_react-dom@18.2.0_react@18.2.0_sass@1.64.1\node_modules\next\dist\compiled\next-server\app-route.runtime.dev.js:6:56839)
    at async invokeRequest (D:\ws\techos-web\node_modules\.pnpm\next@14.0.3_react-dom@18.2.0_react@18.2.0_sass@1.64.1\node_modules\next\dist\server\lib\server-ipc\invoke-request.js:17:12)
    at async D:\ws\techos-web\node_modules\.pnpm\next@14.0.3_react-dom@18.2.0_react@18.2.0_sass@1.64.1\node_modules\next\dist\server\next-server.js:595:35
    at async imageOptimizer (D:\ws\techos-web\node_modules\.pnpm\next@14.0.3_react-dom@18.2.0_react@18.2.0_sass@1.64.1\node_modules\next\dist\server\image-optimizer.js:576:13)
    at async cacheEntry.imageResponseCache.get.incrementalCache (D:\ws\techos-web\node_modules\.pnpm\next@14.0.3_react-dom@18.2.0_react@18.2.0_sass@1.64.1\node_modules\next\dist\server\next-server.js:176:65)
    at async D:\ws\techos-web\node_modules\.pnpm\next@14.0.3_react-dom@18.2.0_react@18.2.0_sass@1.64.1\node_modules\next\dist\server\response-cache\index.js:90:36
    at async D:\ws\techos-web\node_modules\.pnpm\next@14.0.3_react-dom@18.2.0_react@18.2.0_sass@1.64.1\node_modules\next\dist\lib\batcher.js:41:32
```


```sh
2024-02-26 22:09:51   [blog] error:     Error: fetch failed                                                                                                           
        at context.fetch (/app/node_modules/.pnpm/next@14.0.4_react-dom@18.2.0_react@18.2.0_sass@1.69.5/node_modules/next/dist/server/web/sandbox/context.js:272:38)      
        at SessionMiddleware.run (/app/.next/server/src/middleware.js:2651:32)                                                                                            
        at process.processTicksAndRejections (node:internal/process/task_queues:95:5) {                                                                                   
    cause: Error: Client network socket disconnected before secure TLS connection was established                                                                       
        at connResetException (node:internal/errors:720:14)                                                                                                             
        at TLSSocket.onConnectEnd (node:_tls_wrap:1714:19)                                                                                                              
        at TLSSocket.emit (node:events:529:35)                                                                                                                          
        at endReadableNT (node:internal/streams/readable:1400:12)                                                                                                       
        at process.processTicksAndRejections (node:internal/process/task_queues:82:21) {                                                                                
    code: 'ECONNRESET',                                                                                                                                               
    path: undefined,                                                                                                                                                  
    host: 'www-dev.techos.dev',                                                                                                                                       
    port: 443,                                                                                                                                                        
    localAddress: null  
```