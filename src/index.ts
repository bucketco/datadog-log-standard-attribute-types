export enum DD_STATUS {
    EMERGENCY = "emerg",
    ALERT = "alert",
    CRITICAL = "crit",
    ERROR = "err",
    WARNING = "warning",
    NOTICE = "notice",
    INFO = "info",
    DEBUG = "debug",
  }

  export interface DD_META_STRUCTURE {
    /**
     * The name of the originating host as defined in metrics.
     *
     * We automatically retrieve corresponding host tags from
     * the matching host in Datadog and apply them to your logs.
     * The Agent sets this value automatically.
     */
    host?: string;

    /**
     * This corresponds to the integration name: the technology from which the log originated.
     *
     * When it matches an integration name, Datadog automatically installs the corresponding parsers and facets.
     * For example: nginx, postgresql, etc.
     */
    source?: string;

    /**
     * This corresponds to the level/severity of a log.
     *
     * It is used to define patterns and has a dedicated layout in the Datadog Log UI.
     */
    status?: DD_STATUS;

    /**
     * The name of the application or service generating the log events.
     *
     * It is used to switch from Logs to APM, so make sure you define the same value when you use both products.
     */
    service?: string;

    /**
     * By default, Datadog ingests the value of the message attribute as the body of the log entry.
     * That value is then highlighted and displayed in Live Tail, where it is indexed for full text search.
     */
    message?: string;

    error?: {
      /** A concise, human-readable, one-line message explaining the event */
      message?: string;

      /** The stack trace or the complementary information about the error */
      stack?: string;

      /** The type or “kind” of an error (i.e “Exception”, “OSError”, …) */
      kind?: string;
    };

    logger?: {
      /** Name of the logger */
      name?: string;

      /** The name of the current thread when the log is fired. */
      thread_name?: string;

      /** The class method name. */
      method_name?: string;

      /** The version of the logger */
      version?: string | number;
    };

    /**
     * A duration of any kind in nanoseconds: HTTP response time, database query time, latency, etc.
     */
    duration?: number;

    /**
     * Database related attributes are prefixed by db
     */
    db?: {
      /**
       * 	Database instance name. E.g., in Java, if jdbc.url="jdbc:mysql://127.0.0.1:3306/customers", the instance name is customers.
       */

      instance?: string;

      /**
       * 	A database statement for the given database type. E.g., for mySQL: "SELECT * FROM wuser_table"; for Redis: "SET mykey 'WuValue'".
       */
      statement?: string;

      /**
       * 	The operation that was performed (“query”, “update”, “delete”,…).
       */
      operation?: string;

      /**
       * 	User that performs the operation.
       */
      user?: string;
    };

    /**
     * User related attributes
     *
     * All attributes and measures are prefixed by usr.
     */
    usr?: {
      /**
       * The user identifier.
       */
      id?: string;

      /**
       * The user friendly name.
       */
      name?: string;

      /**
       * The user email.
       */
      email?: string;
    };

    /**
     * Syslog and log shippers
     *
     * These attributes are related to the data added by a syslog or a log-shipper agent.
     * All fields and metrics are prefixed by syslog.
     */
    syslog?: {
      /**
       * The hostname
       */
      hostname?: string;

      /**
       * The application name. Generally remapped to the service reserved attribute.
       */
      appname?: string;

      /**
       * The log severity. Generally remapped to the status reserved attribute.
       */
      severity?: number;

      /**
       * The log timestamp. Generally remapped to the date reserved attribute.
       */
      timestamp?: string;

      /**
       * The environment name where the source of logs come from.
       */
      env?: string;
    };

    /**
     * DNS
     */
    dns?: {
      /**
       * The DNS query identifier.
       */
      id?: string;

      question?: {
        /**
         * 	The queried domain name.
         */
        name?: string;

        /**
         * 	A two octet code which specifies the DNS question type.
         */
        type?: string;

        /**
         * 	The class looked up by the DNS question (i.e IN when using the internet).
         */
        class?: string;

        /**
         * 	The DNS question size in bytes.
         */
        size?: number;
      };

      answer?: {
        /**
         * 	The IP address that the DNS answers with.
         */
        name?: string;

        /**
         * 	A two octet code which specifies the DNS answer type.
         */
        type?: string;

        /**
         * 	The class answered by the DNS.
         */
        class?: string;

        /**
         * 	The DNS answer size in bytes.
         */
        size?: number;
      };

      flags?: {
        /**
         * 	The DNS reply code.
         */
        rcode?: string;
      };
    };

    evt?: {
      /**
       * 	The shared name across events generated by the same activity (e.g.: authentication).
       */
      name?: string;

      /**
       * 	The result of the event (e.g. success, failure).
       */
      outcome?: string;
    };

    /**
     * Attributes related to the data used in network communication
     *
     * Typical integrations relying on these attributes include Apache, Varnish, AWS ELB, Nginx, HAProxy, etc.
     */
    network?: {
      client?: {
        /**
         * 	The IP address of the client that initiated the TCP connection.
         */
        ip?: string;

        /**
         * 	The port of the client that initiated the connection.
         */
        port?: number;

        /**
         * Attributes related to the geolocation of IP addresses used in network communication
         */
        geoip?: {
          country?: {
            /**
             * 	Name of the country
             */
            name?: string;

            /**
             * 	ISO Code of the country (example: US for the United States, FR for France)
             */
            iso_code?: string;
          };
          continent?: {
            /**
             * 	ISO code of the continent (EU, AS, NA, AF, AN, SA, OC)
             */
            code?: string;

            /**
             * 	Name of the continent (Europe, Australia, North America, Africa, Antartica, South America, Oceania)
             */
            name?: string;
          };
          subdivision?: {
            /**
             * 	Name of the first subdivision level of the country (example: California in the United States or the Sarthe department in France)
             */
            name?: string;

            /**
             * 	ISO Code of the first subdivision level of the country (example: CA in the United States or the SA department in France)
             */
            iso_code?: string;
          };
          city?: {
            /**
             * 	The name of the city (example Paris, New York)
             */
            name?: String;
          };
        };
      };

      destination?: {
        /**
         * 	The IP address the client connected to.
         */
        ip?: string;

        /**
         * 	The TCP port the client connected to.
         */
        port?: number;
      };

      /**
       * 	Total number of bytes transmitted from the client to the server when the log is emitted.
       */
      bytes_read?: number;

      /**
       * 	Total number of bytes transmitted from the server to the client when the log is emitted.
       */
      bytes_written?: number;
    };

    /**
     * Attributes related to the data commonly used in HTTP requests and accesses.
     *
     * Typical integrations relying on these attributes include Apache, Rails, AWS CloudFront, web applications servers, etc.
     */
    http?: {
      /**
       * 	The URL of the HTTP request.
       */
      url?: string;

      /**
       * 	The HTTP response status code.
       */
      status_code?: number;

      /**
       * 	Indicates the desired action to be performed for a given resource.
       */
      method?:
        | "GET"
        | "HEAD"
        | "POST"
        | "PUT"
        | "DELETE"
        | "CONNECT"
        | "OPTIONS"
        | "TRACE"
        | "PATCH";

      /**
       * 	HTTP header field that identifies the address of the webpage that linked to the resource being requested.
       */
      referer?: string;

      /**
       * 	The ID of the HTTP request.
       */
      request_id?: string;

      /**
       * 	The User-Agent as it is sent (raw format). See below for more details.
       */
      useragent?: string;

      /**
       * 	The version of HTTP used for the request.
       */
      version?: string;

      /**
       * Attributes providing details about the parsed parts of the HTTP URL.
       * They are generally generated thanks to the URL parser.
       */
      url_details?: {
        /**
         * 	The HTTP host part of the URL.
         */
        host?: string;

        /**
         * 	The HTTP port part of the URL.
         */
        port?: number;

        /**
         * 	The HTTP path part of the URL.
         */
        path?: string;

        /**
         * 	The HTTP query string parts of the URL decomposed as query params key/value attributes.
         */
        queryString?: object;

        /**
         * 	The protocol name of the URL (HTTP or HTTPS)
         */
        scheme?: string;
      };

      /**
       * Attributes providing details about the meanings of user-agents' attributes.
       * They are generally generated thanks to the User-Agent parser.
       */
      useragent_details?: {
        os?: {
          /**
           * 	The OS family reported by the User-Agent.
           */
          family?:	string
        }

        browser?: {
          /**
           * 	The Browser Family reported by the User-Agent.
           */
          family?:	string
        }

        device?: {
          /**
           * 	The Device family reported by the User-Agent.
           */
          family?:	string
        }
      }
    };

    [k: string]: null | undefined | string | number | object;
  }
