package com.ifunsoftware.c3web.data

import com.ifunsoftware.c3web.models.User

import scala.collection.mutable.ArrayBuffer

/**
 * Created by alexander on 01.11.15.
 */

/**
 * S
 * User data stored in a mutable array for demonstration purposes.
 * This would normally be replaced by a DAO layer that makes calls to
 * a database or external service that persists user data.
 */
object UserData {
  val userMock = ArrayBuffer(
    User("b88f00cf-6886-4abf-9799-3903bca79827", "admin@admin.com", "admin", "Admin", ""),
    User("e879ec5a-0ae8-4e2b-813f-50a66036c5ca", "user@user.com", "user", "Test", "User"),
    User("a65a9fc6-66c2-4094-8ff8-283d118e8339", "legotin@с3.com", "legotin", "Alexander", "Legotin"),
    User("a289f55a-fb76-4fe7-bfd3-80e70c7f2e46", "korolev@с3.com", "korolev", "Valentin", "Korolev"),
    User("e6f2f8a1-59b7-4b44-a1aa-de96c4f143a1", "nikitin@с3.com", "nikitin", "Nicolai", "Nikitin"),
    User("f43012c7-ed9b-4755-bbae-7f1e6c506057", "kobtsev@с3.com", "kobtsev", "Sergey", "Kobtsev"),
    User("25c9d101-72fc-4227-9cf1-57e7582e8d5f", "kojushev@user.com", "kojushev", "Sergey", "Kojushev"),
    User("4d50ca40-49bb-4c10-9317-45f32cf8a944", "test@test.com", "test", "Test", "User"))
}

