package main

import "gofr.dev/pkg/gofr"

type Car_detail struct {
	Car_no string `json:"car_no"`
	Status string `json:"status"`
}

func main() {
	app := gofr.New()

	app.POST("/postcardetails/{car_no}/{status}", func(ctx *gofr.Context) (interface{}, error) {
		car_no := ctx.PathParam("car_no")
		status := ctx.PathParam("status")
		_, err := ctx.DB().ExecContext(ctx, "INSERT INTO car_status (car_no , status) VALUES (? , ?)", car_no, status)

		return nil, err
	})

	app.GET("/getcardetails", func(ctx *gofr.Context) (interface{}, error) {
		var cars []Car_detail

		rows, err := ctx.DB().QueryContext(ctx, "SELECT * FROM car_status")
		if err != nil {
			return nil, err
		}

		for rows.Next() {
			var car Car_detail
			if err := rows.Scan(&car.Car_no, &car.Status); err != nil {
				return nil, err
			}

			cars = append(cars, car)
		}

		return cars, nil
	})

	app.Start()
}
