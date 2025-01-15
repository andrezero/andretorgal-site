export type AtomFeed = {
    id: string;
    title: string;
    subtitle: string;
    uri: string;
    site: {
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
    content: string;
    categories: string[];
};
