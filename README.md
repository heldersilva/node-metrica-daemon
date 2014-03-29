node-metrica-daemon
===================

A daemon application to expose, trough an http server information, provided by procfs-stats.

Global stats:

/cpu
/tcp
/udp
/unix
/net
/disk
/wifi


Process stats:

/:pid/io
/:pid/stat
/:pid/statm
/:pid/status
/:pid/env
/:pid/cwd
/:pid/argv
/:pid/fds
/:pid/threads
/:pid/thread/:threadid
