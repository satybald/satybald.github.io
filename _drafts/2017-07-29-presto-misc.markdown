---
layout: post
title:  "Presto Misc"
date:   2017-07-29 09:00:00
comments: true
categories: prestodb
---

Presto Misc 


thread visualization UI at /ui/thread
ui/thread

ThreadResource

https://github.com/prestodb/presto/issues/6644


select * from "com.facebook.presto.hive:name=prestos3filesystemstats";
https://github.com/prestodb/presto/pull/1571

How Scheduler is implmented in Presto?

HashAggregations


presto --server localhost:8080 --catalog jmx --schema jmx --execute "select regexp_like('abcdefghijklmnopqrstuvwxyz', 'a')"


Integration ipyton notebook with prestodb


max_split_size


/v1/resourceGroupState

Kairos pluggin for presto metrics.
https://github.com/Shopify/presto_metrico


ASG - for presto.

http://localhost:8082/v1/cluster/

Coordinator:
Find nodes in a cluster
Coonector provideas a metadata service
Client gets result from the worker


How queries get run in Presto?
Coordinator
Worker


Presto Tunning!
https://github.com/prestodb/presto/pull/5753/files

jstack -F <pid>. kill -3 <pid>