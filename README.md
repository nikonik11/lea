# Léa Moulin Couture — Thème Shopify (Dawn)

Ce dépôt versionne les modifications apportées au thème **Dawn** de la boutique
[leamoulincouture.fr](https://leamoulincouture.fr).

Le thème complet vit dans l'admin Shopify (thème `Dawn`, id
`gid://shopify/OnlineStoreTheme/181749383491`). Ce dépôt ne contient, pour
l'instant, que les fichiers modifiés par Claude, avec leur historique de
changement.

## Modifications

### Tri "en stock d'abord" sur les pages collection

Fichier : [`sections/main-collection-product-grid.liquid`](sections/main-collection-product-grid.liquid)

Sur les pages de collection, les produits disponibles (`product.available`)
s'affichent avant les produits sur commande / en rupture de stock (tagués
automatiquement `sur-commande-auto`). À l'intérieur de chaque groupe, l'ordre
du tri sélectionné (`Trier par`) et des facettes est conservé.

Le tri est fait en Liquid, produit par produit, sur les résultats déjà
paginés/filtrés par Shopify :

```liquid
{%- assign available_products = collection.products | where: 'available' -%}
{%- assign unavailable_products = collection.products | where_exp: 'product', 'product.available == false' -%}
{%- assign sorted_products = available_products | concat: unavailable_products -%}
{%- for product in sorted_products -%}
  ...
{%- endfor -%}
```

**Limite connue** : Shopify pagine `collection.products` *avant* que ce tri
ne s'applique. Le regroupement "en stock d'abord" est donc garanti à
l'intérieur de chaque page de résultats, mais pas de façon globale si une
collection s'étend sur plusieurs pages (un produit disponible sur la page 2
ne remonte pas sur la page 1). Pour la plupart des collections de la
boutique (petites séries, souvent < 16-36 produits), tout tient sur une
seule page et le tri est donc parfaitement global. Si une collection plus
grande doit garantir un tri global parfait, augmenter le réglage
"Produits par page" de la section au nombre total de produits de la
collection est la solution la plus simple sans changer l'architecture du
thème.

Testé avec les données réelles de la collection *T-shirt, Sweats, Pulls &
Gilets Bébé* (mix de produits en stock et sur commande, 15 produits, une
seule page).
