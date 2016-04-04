package com.ifunsoftware.c3web.data

import java.util.UUID

import com.ifunsoftware.c3web.models.Group

import scala.collection.mutable.ArrayBuffer

/**
 * Created by alexander on 02.11.15.
 */

/**
 * User data stored in a mutable array for demonstration purposes.
 * This would normally be replaced by a DAO layer that makes calls to
 * a database or external service that persists user data.
 */
object GroupData {
  val groupMock = ArrayBuffer(
    Group("005a47bb-5457-4c22-ba27-4d61608f5a37", Some("Perfomance"), Some("Description")),
    Group("3cb27531-6ba1-4270-b7bc-246d89b8502f", Some("C3-Docs"), Some("Test description")),
    Group("922f1f2a-26a3-4dd3-9fe9-2051fe56ec43", Some("Королёв"), Some("Подготовка магистерской работы Валентина Королёва")),
    Group("0116e33d-b5a2-4bdf-a7c2-ac280965e814", Some("Леготин"), Some("Подготовка магистерской работы Александра Леготина")),
    Group("b3b87240-39a5-448b-a11f-9788e272dd09", Some("Никитин"), Some("Подготовка магистерской работы Николая Никитина")),
    Group("273a4a8c-40c8-437d-8e58-9c56dc5f48dd", Some("DevOPS"), Some("Nice group")))
}
