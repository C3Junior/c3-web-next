package com.ifunsoftware.c3web.data
import com.ifunsoftware.c3web.models.{ AnnotationToken, File, Group, Metadata }
import com.sun.xml.internal.org.jvnet.fastinfoset.VocabularyApplicationData
import spray.http.MediaTypes
import com.ifunsoftware.c3web.data;

import scala.collection.mutable.ArrayBuffer

/**
 * Created by admin on 23.01.2016.
 */
object FileData {

  val fileMock = ArrayBuffer(
    File("/3cb27531-6ba1-4270-b7bc-246d89b8502f/testfolder",
      new Metadata("TEST FOLDER", "5345345", "admin", List(AnnotationToken("tag1", 30, false)), "folder", "24.12.2015"), None, "folder", true),
    File("/3cb27531-6ba1-4270-b7bc-246d89b8502f/testfolder/test2",
      new Metadata("TEST FOLDER 2", "5345345", "admin", List(AnnotationToken("tag1", 30, false)), "folder", "24.12.2015"), None, "folder", true),
    File("/3cb27531-6ba1-4270-b7bc-246d89b8502f/testfolder/file1.txt",
      new Metadata("file1", "10241024", "admin", List(AnnotationToken("tag1", 30, false)), "other", "23.12.2015"), Some("TEST1".getBytes), "text/plain", false),
    File("/3cb27531-6ba1-4270-b7bc-246d89b8502f/testfolder/file2.txt",
      new Metadata("file2", "2048234234", "admin", List(AnnotationToken("tag1", 30, false)), "other", "24.12.2015"), Some("TEST2".getBytes), "text/plain", false),
    File("/3cb27531-6ba1-4270-b7bc-246d89b8502f/file3.txt",
      new Metadata("file3", "34534523", "admin", List(AnnotationToken("tag1", 30, false)), "other", "25.12.2015"), Some("TEST3".getBytes), "text/plain", false),
    File("/005a47bb-5457-4c22-ba27-4d61608f5a37/file3.txt",
      new Metadata("file4", "1231233", "admin", List(AnnotationToken("tag1", 30, false)), "other", "23.12.2015"), Some("TEST4".getBytes), "text/plain", false),
    File("/273a4a8c-40c8-437d-8e58-9c56dc5f48dd/file3.txt",
      new Metadata("file5", "10241024", "admin", List(AnnotationToken("tag1", 30, false)), "other", "23.12.2015"), Some("TEST5".getBytes), "text/plain", false),
    File("ComputerScience.cv",
      new Metadata("Computer Science Controlled vocabulary", "10241024", "admin", List(), "other", "23.12.2015"), Some(VocabularyData.sampleCvText.toCharArray.map(_.toByte)), "text/plain", false),
    File("StopWordsRu.sw",
      new Metadata("Russian stop words vocabulary", "10241024", "admin", List(), "other", "23.12.2015"), Some(VocabularyData.stopWordRu.toCharArray.map(_.toByte)), "text/plain", false),
    File("StopWordsEn.sw",
      new Metadata("English stop words vocabulary", "10241024", "admin", List(), "other", "23.12.2015"), Some(VocabularyData.stopWordEng.toCharArray.map(_.toByte)), "text/plain", false))
}

