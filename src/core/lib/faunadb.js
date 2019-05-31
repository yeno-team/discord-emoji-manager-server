'use strict';

import faunadb, { query as q } from 'faunadb';

const faunaClient = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET
});

export function SetUpDBSchema () {
    console.log("Setting up DB");
    return faunaClient.query(
        q.Do(
            q.CreateClass({name: "users"}),
            q.CreateClass({name: "emojis"}),
            q.CreateClass({name: "packs"})
        )
    ).then(() => {

            return faunaClient.query(
                q.Do(
                    q.CreateIndex({
                        name: "all_users",
                        source: q.Class("users")
                    }),

                    q.CreateIndex({
                        name: "all_emojis",
                        source: q.Class("emojis")
                    }),

                    q.CreateIndex({
                        name: "all_packs",
                        source: q.Class("packs")
                    })

                )
            )

        }).catch((e) => console.log);
}

export function createEmoji (emoji) {
  return faunaClient.query(
    q.Select(
        "data",
        q.Create(q.Class("emojis"), {data : emoji})
    )
  );
}

export function getEmojis() {
    return faunaClient.query(
        q.Select(
            "data",
            q.Map(
                q.Paginate(q.Match(q.Index("all_emojis"))),
                (row) => q.Select("data", q.Get(row))
            ))
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

export function getPacks () {
    return faunaClient.query(
        q.Select(
            "data",
            q.Map(
                q.Paginate(q.Match(q.Index("all_packs"))),
                (row) => q.Select("data", q.Get(row))
        ))
    );
}

export function getUsers () {
    return faunaClient.query(
        q.Select(
            "data",
            q.Map(
                q.Paginate(q.Match(q.Index("all_users"))),
                (row) => q.Select("data", q.Get(row))
            )
        )
    )
};

export function createUser (user) {
  return faunaClient.query(
    q.Select(
        "data",
        q.Create(q.Class("users"), {data : user})
    )
  );
}