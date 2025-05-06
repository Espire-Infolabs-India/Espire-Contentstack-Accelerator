// Icon or asset details used in footer links
export interface FooterIcon {
    uid: string;
    _version: number;
    is_dir: boolean;
    ACL: Record<string, unknown>;
    content_type: string;
    created_at: string;
    created_by: string;
    file_size: string;
    filename: string;
    parent_uid: string;
    tags: string[];
    title: string;
    updated_at: string;
    updated_by: string;
    publish_details: {
        time: string;
        user: string;
        environment: string;
        locale: string;
    };
    url: string;
}

// Metadata wrapper for individual links
export interface FooterLink {
    label: string;
    url: string;
    icon: FooterIcon;
    // _metadata: {
    //   uid: string;
    // };
}

// The full entry for the footer content
export interface FooterEntry {
    uid: string;
    _version: number;
    locale: string;
    // ACL: Record<string, unknown>;
    // _in_progress: boolean;
    created_at: string;
    created_by: string;
    footer_description: string;
    footer_links: FooterLink[];
    footer_copyright: string;
    extra_field: string;
    multi_line: string;
    tags: string[];
    title: string;
    updated_at: string;
    updated_by: string;
    publish_details: {
        time: string;
        user: string;
        environment: string;
        locale: string;
    };
}

//   The wrapper object for the "entry" field
export interface FooterResponse {
    entry: FooterEntry;
}