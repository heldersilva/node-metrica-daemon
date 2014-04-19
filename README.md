node-metrica-daemon
===================

A daemon application to expose, trough an http server, information provided by procfs-stats and os node module.


## procfs-stats

### Global stats:

procfs-stats/cpu
procfs-stats/tcp
procfs-stats/udp
procfs-stats/unix
procfs-stats/net
procfs-stats/disk
procfs-stats/wifi

### Process stats:

procfs-stats/:pid/io
procfs-stats/:pid/stat
procfs-stats/:pid/statm
procfs-stats/:pid/status
procfs-stats/:pid/env
procfs-stats/:pid/cwd
procfs-stats/:pid/argv
procfs-stats/:pid/fds
procfs-stats/:pid/threads


## os-utils

### Global stats:

os-utils/cpu
os-utils/mem
os-utils/loadavg
