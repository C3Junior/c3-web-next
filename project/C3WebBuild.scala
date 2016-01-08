import com.typesafe.sbt.SbtScalariform
import com.typesafe.sbt.SbtScalariform.ScalariformKeys
import org.scalastyle.sbt.ScalastylePlugin
import sbt.Keys._
import sbt._
import sbtassembly.AssemblyPlugin.autoImport._
import spray.revolver.RevolverPlugin._

object C3WebBuild extends Build {

  import ProjectSettings._

  /**
   * Parent C3-Web project
   */
  lazy val c3web = Project("c3web", file(".")).settings(defaultSettings: _*).aggregate(c3web_server)

  /**
   * Server module
   */
  lazy val c3web_server = Project("c3web-server", file("c3web-server"))
    .settings(defaultSettings: _*)
    .settings(c3webAssemblySettings: _*)
    .settings(Revolver.settings: _*)
    .settings(libraryDependencies ++= Dependencies.c3webServer)

  override lazy val settings = {
    super.settings ++
      buildSettings ++
      Seq(
        shellPrompt := {
          s => Project.extract(s).currentProject.id + " > "
        }
      )
  }
  unmanagedResourceDirectories in Compile <+= (baseDirectory)

  excludeFilter in unmanagedResources := HiddenFileFilter || "node_modules*" || "project*" || "target*"
}

object ProjectSettings {
  lazy val buildSettings = Seq(
    organization := "com.ifunsoftware.c3web",
    version := ProjectVersion,
    scalaVersion := ScalaVersion
  )
  lazy val defaultSettings = Defaults.defaultSettings ++
    ScalastylePlugin.Settings ++
    formatSettings ++
    Seq(
      scalacOptions in Compile := Seq(
        "-encoding", "utf8", "-target:jvm-1.8", "-feature", "-language:implicitConversions", "-language:postfixOps", "-unchecked", "-deprecation",
        "-Ywarn-adapted-args", "-Xlog-reflective-calls"
      ))
  resolvers ++=
    Seq(
      "spray repo" at "http://repo.spray.io/",
      "Typesafe Repository" at "http://repo.typesafe.com/typesafe/releases/"
    )
  lazy val c3webAssemblySettings = Seq(
    mainClass in assembly := Some("com.ifunsoftware.c3web.Boot"),
    jarName in assembly := "c3web-server.jar")
  lazy val formatSettings = SbtScalariform.scalariformSettings ++ Seq(
    ScalariformKeys.preferences in Compile := formattingPreferences,
    ScalariformKeys.preferences in Test := formattingPreferences
  )
  lazy val formattingPreferences = {
    import scalariform.formatter.preferences._
    FormattingPreferences()
      .setPreference(AlignParameters, true)
      .setPreference(AlignSingleLineCaseStatements, true)
  }
  val ProjectVersion = "1.0"
  val ScalaVersion = "2.11.7"
}

object Dependencies {
  val akkaV = "2.4.1"
  val akkaStreamV = "2.0.1"
  val sprayV = "1.3.3"
  val scalaTestV = "2.2.6"
  val c3webServer = Seq(
    Compile.akkaActor,
    Compile.akkaStream,
    Compile.akkaHttpCore,
    Compile.akkaHttp,
    Compile.sprayJson,
    Compile.sprayJSONNE,
    Compile.sprayServlet,
    Compile.sprayRouting,
    Compile.sprayClient,
    Compile.sprayUtils,
    Compile.sprayCaching,
    Compile.sprayCan,
    Compile.logger,
    Compile.logback,
    Test.scalatest, Test.spraytestkit, Test.scalaspec)

  object Compile {
    val sprayServlet = "io.spray" %% "spray-servlet" % sprayV
    val sprayRouting = "io.spray" %% "spray-routing" % sprayV
    val sprayClient = "io.spray" %% "spray-client" % sprayV
    val sprayUtils = "io.spray" %% "spray-util" % sprayV
    val sprayCaching = "io.spray" %% "spray-caching" % sprayV
    val sprayCan = "io.spray" %% "spray-can" % sprayV
    val sprayJSONNE = "io.spray" %%  "spray-json"  % "1.3.2"
    val akkaActor = "com.typesafe.akka" % "akka-actor_2.11" % akkaV
    val logger = "com.typesafe.akka" % "akka-slf4j_2.11" % akkaV
    val akkaStream = "com.typesafe.akka" % "akka-stream-experimental_2.11" % akkaStreamV
    val akkaHttpCore = "com.typesafe.akka" % "akka-http-core-experimental_2.11" % akkaStreamV
    val akkaHttp = "com.typesafe.akka" % "akka-http-experimental_2.11" % akkaStreamV
    val sprayJson = "com.typesafe.akka" %% "akka-http-spray-json-experimental" % akkaStreamV
    val logback = "ch.qos.logback" % "logback-classic" % "1.1.3"
  }

  object Test {
    val scalatest = "org.scalatest" % "scalatest_2.11" % "3.0.0-M15" % "test"
    val scalaspec = "org.specs2" % "specs2-core_2.11" % "3.7"
    val spraytestkit = "io.spray" % "spray-testkit_2.11" % sprayV % "test"
  }
}
