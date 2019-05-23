'use strict';

import faunadb, { q as query } from 'faunadb';

const faunaClient = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET
});

export function SetUpDBSchema () {

    return faunaClient.query(
        q.Do(
            q.CreateClass({name: "emojis"}),
            q.CreateClass({name: "packs"})
        )
    ).then(() => {

            return faunaClient.query(
                q.Do(


                    q.CreateIndex({
                        name: "all_emojis",
                        source: q.Class("emojis")
                    }),

                    q.CreateIndex({
                        name: "all_packs",
                        source: q.Class("packs")
                    }),

                    q.CreateIndex({
                        name: "emoji_by_id",
                        source: q.Class("emojis"),
                        unique: true,
                        terms: [{
                            field: ["data", "id"]
                        }]
                    }),

                    q.CreateIndex({
                        name: "emojis_by_creator",
                        source: q.Class("emojis"),
                        terms: [{
                            field: ["data", "creator"]
                        }]
                    }),

                    q.CreateIndex({
                        name: "packs_by_creator",
                        source: q.Class("packs"),
                        terms: [{
                            field: ["data", "creator"]
                        }]
                    }),

                    q.CreateIndex({
                        name: "pack_by_id",
                        source: q.Class("packs"),
                        unique: true,
                        terms: [{
                            field: ["data", "id"]
                        }]
                    })
                )
            )

        }).catch((e) => console.log);
}

export function getEmoji (id) {
    return faunaClient.query(
        q.Select(
            "data",
            q.Get(q.Match(q.Index("emoji_by_id"), id)))
    );
}

export function getEmojis(creator) {
    if (creator) {
        return faunaClient.query(
            q.Select(
                "data",
                q.Get(q.Match(q.Index("emojis_by_creator"), creator)))
        );
    } else {
        return faunaClient.query(
            q.Select(
                "data",
                q.Map(
                    q.Paginate(q.Match(q.Index("all_emojis"))),
                    (row) => q.Select("data", q.Get(row))
            ))
        );
    }
}


export function createEmoji (emoji) {
  return faunaClient.query(
    q.Select(
        "data",
        q.Create(q.Class("emojis"), {data : emoji})
    )
  );
}


export function getPack (id) {
    return faunaClient.query(
        q.Select(
            "data",
            q.Get(q.Match(q.Index("pack_by_id"), id)))
    );
}

export function createPack (pack) {
  return faunaClient.query(
    q.Select(
        "data",
        q.Create(q.Class("packs"), {data : pack})
    )
  );
}

export function getPacks (creator) {
    if (creator) {
        return faunaClient.query(
            q.Select(
                "data",
                q.Get(q.Match(q.Index("packs_by_creator"), creator)))
        );
    } else {
        return faunaClient.query(
            q.Select(
                "data",
                q.Map(
                    q.Paginate(q.Match(q.Index("all_packs"))),
                    (row) => q.Select("data", q.Get(row))
            ))
        );
    }
}