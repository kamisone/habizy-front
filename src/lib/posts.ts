export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  readingTime: number;
  content: string;
}

const posts: Post[] = [
  {
    slug: 'bien-gerer-les-courses-en-colocation',
    title: 'Comment bien gérer les courses en colocation',
    description:
      'Finies les disputes sur qui fait les courses ! Découvrez nos conseils pratiques pour organiser les achats communs en coloc.',
    date: '2025-06-10',
    category: 'Conseils',
    readingTime: 4,
    content: `
<p>La gestion des courses est l'une des principales sources de tension en colocation. Qui achète quoi ? Qui a payé la dernière fois ? Combien chacun doit-il ? Ces questions, souvent banales, peuvent rapidement empoisonner la vie commune.</p>

<h2>Établir un système de rotation</h2>
<p>La première bonne pratique est de mettre en place un système de rotation clair. Chaque semaine ou chaque quinzaine, une personne différente est responsable des courses. Ce système présente deux avantages : il répartit équitablement l'effort et évite les mauvaises surprises.</p>

<p>Avec Habizy, la rotation est automatisée. L'app vous notifie quand c'est votre tour, et tout le monde peut voir qui est le "shoppeur" de la semaine.</p>

<h2>Tenir une liste partagée</h2>
<p>Une liste de courses partagée en temps réel, c'est la solution à "j'ai pas vu que tu avais ajouté le lait". Chacun peut ajouter des articles au fil de la semaine, et le responsable des courses n'a plus qu'à se laisser guider.</p>

<h2>Suivre les dépenses</h2>
<p>Gardez une trace de chaque ticket de caisse. Avec le temps, vous aurez une vision claire de combien chaque colocataire a dépensé pour la coloc, et vous pourrez rééquilibrer facilement.</p>

<h2>Communiquer</h2>
<p>Au-delà des outils, la communication reste essentielle. Prenez quelques minutes chaque semaine en coloc pour faire le point sur les besoins et les dépenses. Habizy facilite cette conversation en rendant les chiffres transparents pour tous.</p>
    `,
  },
  {
    slug: 'menage-en-colocation-organiser-les-taches',
    title: 'Ménage en coloc : comment organiser les tâches sans prise de tête',
    description:
      'Un appartement propre sans conflit ? C\'est possible ! Voici comment répartir les tâches ménagères équitablement en colocation.',
    date: '2025-05-28',
    category: 'Vie pratique',
    readingTime: 5,
    content: `
<p>Le ménage est souvent au cœur des tensions en colocation. "T'as pas nettoyé les toilettes depuis trois semaines" ou "je suis toujours le seul à passer l'aspirateur" — ces reproches, on les connaît tous.</p>

<h2>Établir des règles claires dès le départ</h2>
<p>La clé, c'est de définir les règles ensemble, avant que les problèmes n'apparaissent. Qui fait quoi, à quelle fréquence ? Mettez-vous d'accord sur les standards de propreté acceptables pour tout le monde.</p>

<h2>Attribuer des zones de responsabilité</h2>
<p>Plutôt que de faire tourner toutes les tâches, certaines colocations préfèrent attribuer des zones fixes : une personne s'occupe de la cuisine, une autre de la salle de bain, etc. Cette méthode a l'avantage de la clarté.</p>

<h2>Utiliser une app pour le suivi</h2>
<p>Habizy permet de suivre visuellement qui a fait son ménage cette semaine. La barre de progression collective motive tout le monde, et personne ne peut prétendre avoir oublié.</p>

<h2>Ne pas hésiter à signaler les problèmes</h2>
<p>Si quelque chose ne va pas dans le logement (robinet qui fuit, serrure cassée, dégât d'eau), utilisez la fonction de signalement de Habizy pour documenter le problème avec une photo et alerter tous les colocataires.</p>
    `,
  },
  {
    slug: 'application-colocation-habizy',
    title: 'Habizy : l\'app qui révolutionne la vie en colocation',
    description:
      "Découvrez comment Habizy centralise toute la gestion de votre colocation dans une seule application mobile intuitive.",
    date: '2025-05-15',
    category: 'Produit',
    readingTime: 3,
    content: `
<p>Gérer une colocation, c'est beaucoup plus compliqué qu'il n'y paraît. Entre les courses, les dépenses communes, le ménage et les petits problèmes du quotidien, les sources de friction sont nombreuses.</p>

<p>C'est pour répondre à ce problème qu'Habizy a été créé. Une application mobile disponible sur iOS et Android, conçue spécifiquement pour les colocataires.</p>

<h2>Ce que fait Habizy</h2>
<p>Habizy centralise toute la gestion de votre colocation :</p>
<ul>
<li><strong>Rotation des courses</strong> : un système de tour intelligent qui répartit équitablement les achats</li>
<li><strong>Liste partagée</strong> : ajoutez des articles en temps réel, cochez-les pendant les courses</li>
<li><strong>Suivi des dépenses</strong> : scannez ou saisissez vos tickets, visualisez les stats</li>
<li><strong>Ménage</strong> : suivez qui a fait son ménage cette semaine</li>
<li><strong>Signalements</strong> : photographiez et documentez les problèmes</li>
</ul>

<h2>Disponible sur iOS et Android</h2>
<p>Habizy est disponible gratuitement sur l'App Store et le Google Play Store. Créez votre colocation, invitez vos colocataires, et commencez à simplifier votre vie commune dès aujourd'hui.</p>
    `,
  },
];

export function getAllPosts(): Post[] {
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return posts.map((p) => p.slug);
}

export function formatDate(dateStr: string): string {
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(dateStr));
}
