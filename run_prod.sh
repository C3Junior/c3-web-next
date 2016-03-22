#!/usr/bin/env bash
grunt build:prod && sbt c3web-server/run
