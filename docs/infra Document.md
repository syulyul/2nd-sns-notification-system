# infra Document

```cp dowload/snsapp01.pem /.ssh```

```cd .ssh/config```

```
#snsapp
Host snsapp-proxy-server
        HostName 223.130.136.59
        User root
        IdentityFile ~/.ssh/snsapp.pem
```

모든 server == > ```snsapp01.pem```으로 통일<br/>
PW : bitcamp!@#123tp 통일

## mysql 
mysql -u sns-team -h db-j1t71.vpc-cdb.ntruss.com -p

DB 서비스 이름 	snsapp-Mysql<br/>
DB Server 이름	spsapp-mysql-001-3ihk<br/>
Private 도메인	db-j1t71.vpc-cdb.ntruss.com<br/>
DB 접속 포트	3306

Data Base : snsdb<br/>
user : sns-team<br/>
PW : bitcamp!@#123tp


## Mongo
mongo --host j1t0s.vpc.mg.naverncp.com --port 17017


## redis
 - cd redis-6.2.6/
 - cd src/
 -  ./redis-cli -c -h redisc-j1os6.vpc-cdb.ntruss.com -p 6379


## server

> ### Private

### Spring server  
(web04-snsapp)
ssh snsapp-spring<br/>
ip : 172.16.2.7<br/>
Port : 3002

### Node server 
==> chating server (알림 web push)
로그인 세션관리 코드 좀 수정중<br/>
(web03-snsapp)<br/>
ssh snsapp-node
ip : 172.16.2.6

Port : 3001


————————————

> ### Public

<!-- React server == > 화면 렌더링
(web02-snsapp)
- 리액트로 프론트 엔드 이전하면서 로그인 세션관리 코드 좀 수정 -->


### Foroxy server 
(web01-snsapp) - 443 통신
pem : snsapp01<br/>
172.16.1.8<br/>
공인 ip : 223.130.136.59



