export type AtomFeed = {
    id: string;
    title: string;
    subtitle: string;
    uri: string;
    site: {
        cover: string;
        icon: string;
        logo: string;
        color: string;
        uri: string;
    };
    author: {
        name: string;
        email: string;
        uri: string;
    };
};

export type AtomItem = {
    id: string;
    title: string;
    link: string;
    updated: Date;
    summary: string;
    content: string;
    categories: string[];
};
