"use client";

import { useEffect, useState } from "react";
import { getPosts } from "@/app/data/post";

type PostItem = {
    id: number;
    title: string;
    body: string;
    tags?: string[];
    views?: number;
};

function getReadingTime(text: string) {
    const words = text.split(/\s+/).filter(Boolean).length;

    return Math.max(1, Math.ceil(words / 180));
}

function PostsView() {
    const [posts, setPosts] = useState<PostItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let isMounted = true;

        getPosts()
            .then((data) => {
                if (isMounted) {
                    setPosts(data);
                }
            })
            .catch(() => {
                if (isMounted) {
                    setError("Posts data load nahi ho paya.");
                }
            })
            .finally(() => {
                if (isMounted) {
                    setLoading(false);
                }
            });

        return () => {
            isMounted = false;
        };
    }, []);

    const totalViews = posts.reduce((sum, item) => sum + (item.views ?? 0), 0);
    const totalTags = new Set(posts.flatMap((item) => item.tags ?? [])).size;

    return (
        <div className="dashboard-page">
            <section className="dashboard-subpage-hero">
                {/* <div>
                    <p className="section-tag">Content Studio</p>
                    <h1>Posts management dashboard</h1>
                    <p>
                        Published content, reading depth, and tag distribution are now
                        visible in one place for faster admin review.
                    </p>
                </div> */}

                <div className="dashboard-summary-grid">
                    <div className="dashboard-summary-card">
                        <span>Total Posts</span>
                        <strong>{posts.length}</strong>
                    </div>
                    <div className="dashboard-summary-card">
                        <span>Total Views</span>
                        <strong>{totalViews}</strong>
                    </div>
                    <div className="dashboard-summary-card">
                        <span>Unique Tags</span>
                        <strong>{totalTags}</strong>
                    </div>
                    <div className="dashboard-summary-card">
                        <span>Publishing State</span>
                        <strong>Active</strong>
                    </div>
                </div>
            </section>

            <section className="dashboard-panel">
                <div className="dashboard-panel-head">
                    <div>
                        <p className="section-tag">Posts Table</p>
                        <h2>Latest published articles</h2>
                    </div>
                    <span className="dashboard-chip">Live content feed</span>
                </div>

                {loading ? (
                    <div className="dashboard-empty-state">Loading posts...</div>
                ) : error ? (
                    <div className="dashboard-empty-state">{error}</div>
                ) : (
                    <div className="dashboard-table-shell">
                        <table className="dashboard-table">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Preview</th>
                                    <th>Tags</th>
                                    <th>Insights</th>
                                </tr>
                            </thead>

                            <tbody>
                                {posts.map((post) => (
                                    <tr key={post.id}>
                                        <td data-label="Title">
                                            <strong className="dashboard-table-title">{post.title}</strong>
                                        </td>
                                        <td data-label="Preview">
                                            <p className="dashboard-comment-copy">
                                                {post.body.length > 90
                                                    ? `${post.body.slice(0, 90)}...`
                                                    : post.body}
                                            </p>
                                        </td>
                                        <td data-label="Tags">
                                            <span className="dashboard-table-value">
                                                {(post.tags ?? []).join(", ") || "No tags"}
                                            </span>
                                        </td>
                                        <td data-label="Insights">
                                            <span className="dashboard-badge status-ready">
                                                {getReadingTime(post.body)} min read
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>
        </div>
    );
}

export default PostsView;
